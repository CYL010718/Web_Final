import { gql } from 'apollo-boost'

export const POSTS_SUBSCRIPTION = gql`
  subscription {
      post {
        mutation
        data {
          author {
            name
            id
            posts{
              title
              body
              author {
              name
            }
            published
            }
          }
        }
      }
    
    
  }
`
