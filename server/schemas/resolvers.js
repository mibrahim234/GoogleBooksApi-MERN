// simple object called resolvers with a query nested object that holds a series of methods 
// These methods get the same name of the query or mutation they are resolvers for.
const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
// get route 
Query: {
    books: async () => {
      return Book.find();
    },
    book: async (parent, { title }) => {
      return Book.findOne({ title });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    // fix this 
    saveBook: async (parent, {bookData}) => {
      const book = await Book.create(bookData);
      return book; 
    },
      // fix this 
      removeBook: async (parent, {bookData}) => {
        const book = await Book.create(bookData);
        return book; 
      }
    }
  }


module.exports = resolvers;