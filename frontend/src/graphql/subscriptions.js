import { gql } from 'apollo-boost'

export const EVENT_SUBSCRIPTION = gql`

  subscription {
        event{
          mutation
          data{
            id
            title
            body
            start
            end
          }
         
      }
    }
      
`

export const GROUP_SUBSCRIPTION = gql`

  subscription {
        group{
          mutation
          userID
          data{
            id
            name
          }
         
      }
    }
      
`




