import { gql } from 'apollo-boost'

export const EVENT_SUBSCRIPTION = gql`

  subscription {
        event{
          mutation
          id
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




