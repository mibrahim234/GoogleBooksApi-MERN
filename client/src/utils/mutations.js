

//login User

gql`
mutation routeLogin($email: String!, $password: String!) {
    routeLogin(email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}`
//add User

//Save Book

//Remove Book