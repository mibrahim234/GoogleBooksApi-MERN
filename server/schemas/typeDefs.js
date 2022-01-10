const { gql } = require('apollo-server-express');

// create our typeDefs
// All of our type definitions will go into the typeDefs tagged template function.
// To define a query, you use the type Query {}
// All type definitions need to specify what type of data is expected in return, no matter what

// key value pairs 
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: String
    saveBook:[Book]
}

type Book {
    bookId: ID
    authors: [String]
    description: String
    image: String
    link: String
    title: String
}

type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input bookDataInput {
    description: String!,
    bookId: String!,
    image: String!,
    link: String!,
	title: String!,
    author: [String!]
}

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: bookDataInput!) : User
    removeBook(bookId: String!) : User
}
`
module.exports = typeDefs;