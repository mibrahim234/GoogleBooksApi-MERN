// Create an Apollo Provider to make every request work with the Apollo server.
// `App.js`: Using `ApolloClient`, `InMemoryCache`, `createHttpLink`, and `setContext` from the Apollo Client library, create an Apollo Provider to make every request work with the Apollo server.
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Import Components:
import Navbar from './components/Navbar'; 
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

// import pages
import SavedBooks from './pages/SavedBooks';
import SearchBooks from './pages/SearchBooks';
import NoMatch from './pages/NoMatch';

import {
  ApolloClient,
 // is a constructor function that will help initialize the connection to the GraphQL API server.
  InMemoryCache,
  // enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.
  ApolloProvider,
  // is a special type of React component that we'll use to provide data to all of the other components.
  createHttpLink,
 // allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.
} from '@apollo/client';


//retrieve the token from localStorage and include it with each request to the API
import { setContext } from '@apollo/client/link/context';
// With this function, setContext, we can create essentially a middleware function that will retrieve the token for us and combine it with the existing httpLink





const httpLink = createHttpLink({
  // establish a new link to the graphql server
  // URI stands for "Uniform Resource Identifier."
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// With authLink, we use the setContext() function to retrieve the token from localStorage and set the HTTP request headers of every request to include the token, whether the request needs it or not.
// if request doesn't need it, server-side won't look for it

const client = new ApolloClient({
  // combine the authLink and httpLink objects so that every request retrieves the token and sets the request headers before making the request to the API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  //instantiate a new cache object using newmemorycache
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path="/login" component={LoginForm} />
              <Route exact path="/signup" component={SignupForm} />
              <Route exact path='/saved' component={SavedBooks} />
          <Route component={NoMatch} />
            </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
