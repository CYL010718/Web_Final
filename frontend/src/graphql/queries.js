import { gql } from 'apollo-boost'

export const GROUP_EVENT_QUERY = gql`

  query group(
    $id: ID!
  ){
    group(id: $id){
      id
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


export const USER_DEFAULT_GROUP = gql`
  query {
    me {
      id
      defaultGroup{
        id
      }
    }
  }
`

export const GROUP_QUERY = gql`
  query {
    me {
      id
      group{
        id
        name
      }
      
    }
  }
`
export const GROUP_USER_QUERY = gql`
    query group(
      $id: ID!
    ){
      group(id: $id){
        id
        user{
          id
          email
        }
    }
    }
    `

export const GROUP_MANAGER_QUERY = gql`
    query group(
      $id: ID!
    ){
      group(id: $id){
        id
        manager{
          id
          name
        }
    }
    }
    `