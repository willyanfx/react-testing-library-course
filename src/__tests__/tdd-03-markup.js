import {render, screen, waitFor} from '@testing-library/react'
import * as React from 'react'
import userEvent from '@testing-library/user-event'
import {Editor} from '../post-editor-03-api'
import {savePost as mockSavePost} from '../api'

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
      authorId: fakeUser.id,
    })

    expect(mockSavePost).toHaveBeenCalledTimes(1)
  })
})
