import {render, screen} from '@testing-library/react'
import * as React from 'react'
import userEvent from '@testing-library/user-event'
import {Editor} from '../post-editor-02-state'

test('should renders a form with title, content, tags, and a submit button', () => {
  render(<Editor />)
  screen.getByLabelText(/title/i)
  screen.getByLabelText(/content/i)
  screen.getByLabelText(/tags/i)
  const submitBtn = screen.getByText(/submit/i)
  userEvent.click(submitBtn)

  expect(submitBtn).toBeDisabled()
})
