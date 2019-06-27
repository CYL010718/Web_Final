import { gql } from 'apollo-boost'

const LOGIN = gql`

  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
  `

  export default LOGIN