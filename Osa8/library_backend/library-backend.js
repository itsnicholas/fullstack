const config = require('./utils/config')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)

mongoose.set('useCreateIndex', true)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!
    genres: [String]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author') 
      if (!args.author && !args.genre) {
        return books
      } else if (args.author && !args.genre) {
        return null
      } else if (!args.author && args.genre) {
        return books.filter(b => b.genres.includes(args.genre))
      } else {
        return null
      }
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      console.log('books in bookCount', books)
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const authors = await Author.find({})
      if (authors.filter(a => a.name === args.author).length === 1) {
        const author = await Author.findOne({ name: args.author })
        console.log('author already', author)
        const book = new Book({ 
          title: args.title,
          author: author,
          published: args.published,
          genres: args.genres
        })
        const logBook = await book.save()
        console.log('now we have a new book when author is known', logBook)
        return logBook
      } else {
        console.log('no author yet')
        const newAuthor = new Author({ 
          name: args.author, 
          born: null, 
          bookCount: 1 
        })
        const logAuthor = await newAuthor.save()
        console.log('now we have an author', logAuthor)
        const book = new Book({ 
          title: args.title,
          author: logAuthor,
          published: args.published,
          genres: args.genres
        })
        const logBookNewAthor = await book.save()
        console.log('now we have a new book when author was unknown', logBookNewAthor)
        return logBookNewAthor
      }
    },
    editAuthor: async (root, args) => {
      //console.log('args in editAuthor', args.name)
      //const author =  await Author.findOne()
      //console.log('possible author in editAuthor', author)
      //if (!author) {
      //  return null
      //}
      //console.log('args.setBornTo in editAuthor', args.setBornTo)
      //const updateAuthor = { ...author, born: args.setBornTo }
      //console.log('possible updateAuthor in editAuthor', updateAuthor)
      const updatedAuthor = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
      //console.log('possible updatedAuthor in editAuthor', updatedAuthor)
      return updatedAuthor
    } 
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})