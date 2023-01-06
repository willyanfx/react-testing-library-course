import {render, screen, waitFor} from '@testing-library/react'
import * as React from 'react'
import userEvent from '@testing-library/user-event'
import {GreetingLoader} from '../greeting-loader-01-mocking'
import {loadGreeting as mockLoadGreeting} from '../api'

jest.mock('../api')
const TEST_GREETING = 'TEST_GREETING'
test('loads greetings on click', async () => {
  mockLoadGreeting.mockResolvedValueOnce({
    data: {
      greeting: TEST_GREETING,
    },
  })

  render(<GreetingLoader />)

  const nameInput = screen.getByLabelText(/name/i)
  const loadButton = screen.getByText(/load/i)
  nameInput.value = 'Mary'
  userEvent.click(loadButton)
  expect(mockLoadGreeting).toBeCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(TEST_GREETING),
  )
})
