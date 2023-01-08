import {render, screen, waitFor} from '@testing-library/react'
import * as React from 'react'
import userEvent from '@testing-library/user-event'
import {Redirect as MockRedirect} from 'react-router'
import {Editor} from '../post-editor-05-dates'
import {savePost as mockSavePost} from '../api'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api.js')

afterEach(() => {
  jest.clearAllMocks()
})

test('should renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()

  const fakeUser = {id: 'user-1'}
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  const preDate = new Date().getTime()

  render(<Editor user={fakeUser} />)

  userEvent.type(screen.getByLabelText(/title/i), fakePost.title)
  userEvent.type(screen.getByLabelText(/content/i), fakePost.content)
  userEvent.type(screen.getByLabelText(/tags/i), fakePost.tags.join(','))

  const submitBtn = screen.getByText(/submit/i)

  userEvent.click(submitBtn)

  await waitFor(() => {
    expect(submitBtn).toBeDisabled()
    expect(mockSavePost).toHaveBeenCalledWith({
      ...fakePost,
      date: expect.any(String),
      authorId: fakeUser.id,
    })

    expect(mockSavePost).toHaveBeenCalledTimes(1)

    const postDate = new Date().getTime()
    const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
    expect(date).toBeGreaterThanOrEqual(preDate)
    expect(date).toBeLessThanOrEqual(postDate)

    expect(MockRedirect).toHaveBeenCalledWith(
      {
        to: '/',
      },
      {},
    )

    expect(MockRedirect).toHaveBeenCalledTimes(1)
  })
})
