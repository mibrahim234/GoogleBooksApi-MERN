const { gql } = require('apollo-server-express');

// create our typeDefs
// All of our type definitions will go into the typeDefs tagged template function.
// To define a query, you use the type Query {}
// All type definitions need to specify what type of data is expected in return, no matter what
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    savedBooks[Book]
}

type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
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
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(_id: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(authors: String!): Book
  }
`
module.exports = typeDefs;