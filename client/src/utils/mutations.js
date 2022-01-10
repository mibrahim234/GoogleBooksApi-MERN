import { gql } from '@apollo/client';


//login User
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
//add User
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
  addUser(username: $username, email: $email, password: $password) {
     token
  user{
    username
    email
  }
  }
}
`;


//Save Book
export const SAVE_BOOK = gql`
mutation saveBook ($bookData: bookDataInput!) {
  saveBook(bookData:$bookData ) {
	 _id
  username
  email
  bookCount
  saveBook {
      bookId
      authors
      description
      image
      link
       title
      }
    }
  
  } 
`;


//Remove Book
export const REMOVE_BOOK = gql`
mutation removeBook ($bookId: String!, $username: String!, $email: String!) {
  removeBook(bookId: $bookId, username: $username, email: $email {
     user {
      username
      email
    }
  }
  
} 
`;
