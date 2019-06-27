import { gql } from 'apollo-boost'

const CURRENT_USER = gql`
  query {
    me {
      id
      name
      email
    }
  }
`
export default CURRENT_USER