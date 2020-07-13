import React from 'react'

const ShowBlogs = ({
    handleSubmit,
    newTitle,
    newAuthor,
    newUrl,
    handleTitle,
    handleAuthor,
    handleUrl
   }) => {
    return (
        <div>
          <h2>create new</h2>
          <form onSubmit={handleSubmit}>
            <div>
              title:
              <input
                  type="text"
                  value={newTitle}
                  name="Title"
                  onChange={handleTitle}
                  />
            </div>
            <div>
              author:
                <input
                  type="text"
                  value={newAuthor}
                  name="Author"
                  onChange={handleAuthor}
                  />
            </div>
            <div>
              url:
                <input
                  type="text"
                  value={newUrl}
                  name="Url"
                  onChange={handleUrl}
                  />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
      )
}

export default ShowBlogs