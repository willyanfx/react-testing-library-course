import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import * as React from 'react'

const {FavoriteNumber} = require('favorite-number')

// function render(ui) {
//   const container = document.createElement('div')
//   ReactDOM.render(ui, container)
//   const queries = getQueriesForElement(container)
//   return {container, ...queries}
// }

test('renders a number input with a label "Favorite Number"', () => {
  render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
  //   debug(input)
})
