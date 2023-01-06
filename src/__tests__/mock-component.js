import {render, screen} from '@testing-library/react'
import * as React from 'react'
import userEvent from '@testing-library/user-event'
import {HiddenMessage} from '../hidden-message'

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  }
})

test('should show hidden message when toggle is clicked', /*async*/ () => {
  const myMessage = 'hello world'
  render(<HiddenMessage>{myMessage}</HiddenMessage>)

  const toggleButton = screen.getByText(/toggle/i)
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument()
  userEvent.click(toggleButton)
  expect(screen.getByText(myMessage)).toBeInTheDocument()
  userEvent.click(toggleButton)
  //   await waitFor(() =>
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument()
  //   )
})
