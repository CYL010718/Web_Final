import { gql } from 'apollo-boost'

const SIGN_UP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
    }
  }
`
export default SIGN_UP