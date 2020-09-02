import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from 'apollo-link-context'

import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      allBooks: {
        permissions: {
          merge(existing, incoming, { mergeObjects }) {
            if (!existing.includes(incoming)) {
              console.log(mergeObjects(existing, incoming), "allBooks mergeObjects(existing, incoming)")
              return mergeObjects(existing, incoming);
            } else {
              return existing
            }
          }
        },
        fields: {
          genre: {
            read(genre) {
              console.log(genre, "genre in fields genre")
              return genre
            }
          }
        }
      },
      allAuthors: {
        permissions: {
          merge(existing, incoming, { mergeObjects }) {
            if (!existing.includes(incoming)) {
              console.log(mergeObjects(existing, incoming), "allAuthors mergeObjects(existing, incoming)")
              return mergeObjects(existing, incoming);
            } else {
              return existing
            }
          }
        }
      },
      allGenres: {
        permissions: {
          merge(existing, incoming, { mergeObjects }) {
            if (!existing.includes(incoming)) {
              console.log(mergeObjects(existing, incoming), "allGenres mergeObjects(existing, incoming)")
              return mergeObjects(existing, incoming);
            } else {
              return existing
            }
          }
        }
      }
    }
  }),
  link: splitLink
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
)