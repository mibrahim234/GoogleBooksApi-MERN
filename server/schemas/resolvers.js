// simple object called resolvers with a query nested object that holds a series of methods 
// These methods get the same name of the query or mutation they are resolvers for.
const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
// get route 
Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            const userData = await User.findOne({_id: context.user._id})
            .select('-__v -password')
            return userData
        } 
        if (!user) {
            throw new AuthenticationError('Not logged in');
          }
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
    // save a book 
    savedBooks: async (parent, {bookData}, context) => {
      
        const savedData = await Book.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: bookData } },
            // return statement for db
            { new: true }
          );
  
          return savedData;
        }
    },
      // remove a book 
    removeBook: async (parent, {bookId}, context) => {
        const removeData = await Book.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: bookId } },
            // return statement for db
            { new: true }
          );
  
          return removeData;
        
    },
}

module.exports = resolvers;