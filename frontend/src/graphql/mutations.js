import { gql } from 'apollo-boost'

export const CREATE_EVENT_MUTATION = gql`
  mutation createEvent(
    $groupID: ID!
    $title: String!
    $body: String
    $start: String!
    $end: String!
  ) {
    createEvent(
      data: {
        groupID: $groupID
        title: $title
        body: $body
        start: $start
        end: $end
      }
    ) {
      title
      body
      start
      end
    }
  }
`
export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $name: String
    $email: String
    $password: String
  ) {
    updateUser(
      data: {
        name: $name
        email: $email
        password: $password
      }
    ) {
      name
      email
      password
    }
  }
`
export const UPDATE_EVENT_MUTATION = gql`
  mutation updateEvent(
    $eventID: ID!
    $title: String
    $body: String
    $start: String
    $end: String
  ) {
    updateEvent(
      data: {
        eventID: $eventID
        title: $title
        body: $body
        start: $start
        end: $end
      }
    ) {
      title
      body
      start
      end
    }
  }
`