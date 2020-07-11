const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs2) => {
  if (blogs2 && blogs2.length > 0) {
    return blogs2
      .map(blog => blog.likes)
      .reduce((accumulator, curr) => accumulator + curr)
  } else {
    return 0
  }
}

const favoriteBlog = (blogs3) => {
  const blog = blogs3.reduce((l, e) => e.likes > l.likes ? e : l)
  delete blog._id
  delete blog.url
  delete blog.__v
  return blog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}