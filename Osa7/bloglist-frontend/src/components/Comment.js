import React from 'react'

const Comment = ({ comment }) => {
  console.log(comment.content, 'comment.content in Comment.js')

  if (!comment) {
    return null
  }

  return (
    <div>
      <li className='comment'>
        {comment.content}
      </li>
    </div>
  )
}

export default Comment