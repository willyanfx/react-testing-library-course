import 'whatwg-fetch'
import {render, screen, waitFor} from '@testing-library/react'
import * as React from 'react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {GreetingLoader} from '../greeting-loader-01-mocking'

const server = setupServer(
  rest.post('/greeting', (req, res, ctx) => {
    return res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}}))
  }),
)

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('loads greetings on click', async () => {
  render(<GreetingLoader />)

  const nameInput = screen.getByLabelText(/name/i)
  const loadButton = screen.getByText(/load/i)
  nameInput.value = 'Mary'
  userEvent.click(loadButton)
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent('Hello Mary'),
  )
})
