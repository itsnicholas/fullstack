import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author', () => {
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

})

test('renders all blog info after button click', async () => {
  const blog = {
    title: 'First title',
    author: 'Matti Meikäläinen',
    url: 'www.www',
    likes: 2,
    user: { username: 'Matti Meikäläinen' }
  }

  const user = {
    user: { username: 'Matti Meikäläinen' }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'First title Matti Meikäläinen hide www.www likes 2 like Matti Meikäläinen'
  )
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'First title',
    author: 'Matti Meikäläinen',
    url: 'www.www',
    likes: 2,
    user: {username: 'Matti Meikäläinen'}
  }

  const user = {
    user: {username: 'Matti Meikäläinen'}
  }

  const newLike = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} newLike={newLike} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const button2 = component.getByText('like')
  fireEvent.click(button2)
  fireEvent.click(button2)

  expect(newLike.mock.calls).toHaveLength(2)

})