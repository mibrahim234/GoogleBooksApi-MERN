// simple object called resolvers with a query nested object that holds a series of methods 
// These methods get the same name of the query or mutation they are resolvers for.
const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');



module.exports = resolvers;