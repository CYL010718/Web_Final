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

export const DELETE_EVENT_MUTATION = gql`
  mutation deleteEvent(
    $eventID: ID!
    $groupID: ID!
  ) {
    deleteEvent(
      eventID: $eventID
      groupID: $groupID
    ) {
      title
      body
      start
      end
    }
  }
`

export const CREATE_GROUP_MUTATION = gql`
  mutation createGroup(
    $name: String!
  ) {
    createGroup(
      data: {
        name: $name
      }
    ) {
      id
      name
    }
  }
`

export const EDIT_GROUP_NAME_MUTATION = gql`
  mutation editGroupName(
    $id: ID!
    $name: String!
  ) {
    editGroupName(
      data: {
        id: $id
        name: $name
      }
    ) {
      id
      name
    }
  }
`

export const DELETE_GROUP_MUTATION = gql`
  mutation deleteGroup(
    $id: ID!
  ) {
    deleteGroup(
        id: $id
    ) {
      id
      name
    }
  }
`


export const GROUP_ADDUSER__MUTATION = gql`
  mutation GroupAddUser(
    $id: ID!
    $email: String!
  ) {
    GroupAddUser(
        id: $id
        email: $email
    ) {
      id
      name
      email
  }
  }
`

export const GROUP_QUIT_MUTATION = gql`
  mutation quitGroup(
    $id: ID!
  ) {
    quitGroup(
        id: $id
    ) {
      id
      name
  }
  }
`

export const CHANGE_MUTATION = gql`
  mutation groupChangeManager(
    $id: ID!
    $email: String!
  ) {
    groupChangeManager(
        id: $id
        email: $String
    ) {
      id
      name
      email
  }
  }
`