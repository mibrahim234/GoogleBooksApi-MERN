// front end makes the request
// backend receives the request 

//utils; This folder will serve as a location to hold code and functionality that isn't necessarily React-based.

// `queries.js`: This will hold the query `GET_ME`, which will execute the `me` query set up using Apollo Server.
import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        bookCount
        savedBooks: {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`