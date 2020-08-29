import { gql  } from '@apollo/client'

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    id
    genres
    author {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      id
      born
      bookCount
    }
  }
`

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      id
      genres
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const EDIT_USER = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born)  {
      name
      born
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`