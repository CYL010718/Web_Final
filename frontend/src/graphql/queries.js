import { gql } from 'apollo-boost'

export const GROUP_EVENT_QUERY = gql`

  query group(
    $id: ID!
  ){
    group(id: $id){
      event{
        id
        title
        body
        start
        end
      }
   }
  }
`

export const SINGLE_EVENT_QUERY = gql`

  query event(
    $id: ID!
  ){
    event(id: $id){
        id
        title
        body
        start
        end
        author{
          id
        }
      }
   }
`


export const CURRENT_USER = gql`
  query {
    me {
      id
      name
      email
      password
    }
  }
`


