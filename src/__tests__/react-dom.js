import ReactDOM from 'react-dom'
import React from 'react'
const {FavoriteNumber} = require('favorite-number')

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input').type).toBe('number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})
