const config = require('./utils/config')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
      born: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }  

  type Query {
    bookCount: Int!
    authorCount: Int!
    allGenres: [String]!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allGenres: async () => {
      const books = await Book.find({})
      console.log('books in allGenres', books)
      const booksGenres = books.map((book) => book.genres)
      .reduce((pre, cur) => pre.concat(cur))
      console.log('booksGenres in allGenres', booksGenres)
      const genres = [...new Set(booksGenres)]
      console.log('genres in allGenres', genres)
      return genres
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
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      console.log(context.currentUser, 'context.currentUser in library-backend.js')
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findById(root.id)
      .catch(err => console.error(`Failed to find author by id in bookCount: ${err}`))
      console.log('author in Author bookCount', author)
      console.log('author.books in Author bookCount', author.bookCount)
      return author.bookCount
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log(currentUser,'currentUser in library-backend.js')
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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
        try {
          await book.save()
        } catch (error) {
          console.log('error in await book.save()', error)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        await Author.findOneAndUpdate(
          { name: args.author }, 
          { bookCount: author.bookCount + 1 })
          .catch(err => console.error(`Failed to find and update author when addBook and author exists: ${err}`))

        console.log('now we have a new book when author is known', book)
        
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        
        return book
      } else {
        console.log('no author yet')
        const newAuthor = new Author({ 
          name: args.author, 
          born: null, 
          bookCount: 1
        })
        try {
          await newAuthor.save()
        } catch (error) {
          console.log('error in const await newAuthor.save() when author was unknown', error)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        console.log('now we have an author', newAuthor)
        const book = new Book({ 
          title: args.title,
          author: newAuthor,
          published: args.published,
          genres: args.genres
        })
        try {
          await book.save()
        } catch (error) {
          console.log('error in const await book.save() when author was unknown', error)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        console.log('now we have a new book when author was unknown', book)
        
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        
        return book
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log(currentUser, 'currentUser in library-backend.js')

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name }, 
        { born: args.born })
        .catch(err => console.error(`Failed to find and update author when editAuthor: ${err}`))
      return updatedAuthor
    },
    createUser: (root, args) => {
      const user = new User({ 
        username: args.username, 
        favoriteGenre: args.favoriteGenre 
      })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})