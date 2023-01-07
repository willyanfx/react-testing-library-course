import {render, screen} from '@testing-library/react'
import * as React from 'react'

import {Editor} from '../post-editor-01-markup'

test('should renders a form with title, content, tags, and a submit button', () => {
  render(<Editor />)
  screen.getByLabelText(/title/i)
  screen.getByLabelText(/content/i)
  screen.getByLabelText(/tags/i)
})
