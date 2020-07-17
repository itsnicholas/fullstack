import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

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

test('<BlogForm /> calls right info onSubmit', async () => {
  const createBlog = jest.fn()

  const setBlogsVisible = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} setBlogsVisible={setBlogsVisible} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { 
    target: { value: 'First title' } 
  })
  fireEvent.change(author, { 
    target: { value: 'Matti Meikäläinen' } 
  })
  fireEvent.change(url, { 
    target: { value: 'www.www' } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('First title')
  expect(createBlog.mock.calls[0][0].author).toBe('Matti Meikäläinen')
  expect(createBlog.mock.calls[0][0].url).toBe('www.www')
})