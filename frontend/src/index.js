import React from 'react'
import ReactDOM from 'react-dom'
import { InMemoryCache } from 'apollo-boost'
import {ApolloClient} from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from "apollo-link-context";
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: { reconnect: true }
})

const authLink = setContext ((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =  localStorage.getItem('x-token');

  //console.log(token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'authorization': token 
    }
  }
});
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)
const client = new ApolloClient({
  link: authLink.concat(link),
  //uri: 'http://localhost:4000/',
  cache: new InMemoryCache().restore({}),
 /*request: async (operation) => {
    const token = await localStorage.getItem("x-token");
    if (token) {
       operation.setContext({
        headers: {
          'authorization': token
        }
      })
    }
  }*/
})

const wrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(wrappedApp, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
