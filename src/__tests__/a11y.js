import React from 'react'
import {render} from '@testing-library/react'
import {axe} from 'jest-axe'

function Form() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input placeholder="email" id="email" />
    </form>
  )
}

test('form is accessible', async () => {
  const {container} = render(<Form />)
  expect(await axe(container)).toHaveNoViolations()
})
