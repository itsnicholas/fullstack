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

module.exports = {
  dummy, 
  totalLikes
}