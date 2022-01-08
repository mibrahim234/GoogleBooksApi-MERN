// Implement the Apollo Server and apply it to the Express server as middleware.
const express = require('express');

// import ApolloServer
const {ApolloServer} = require('apollo-server-express');

// import our typeDefs and resolvers
const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// create a new Apollo server and pass in our schema data
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
        //This ensures that every request performs an authentication check, and the updated request object will be passed to the resolvers as the context
  });

   // Start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};
 //^^ log where we can go to test our GQL API
  

// Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// IF AND APP.GET ARE FOR PRODUCTION ONLY--code out when using locally 
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// if we make a GET request to any location on the server that doesn't have an explicit route defined, respond with the production-ready React front-end code
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// app.use(routes);

// we run our server, we listen for that connection to be made with db.open(). 
// Upon a successful connection, we start the server.
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
