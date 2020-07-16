import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'First title',
    author: 'Matti Meikäläinen'
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'First title Matti Meikäläinen'
  )
  //const li = component.container.querySelector('li')

  //console.log(prettyDOM(li))
})