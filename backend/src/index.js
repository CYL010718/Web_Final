import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Event from './resolvers/Event'
import Comment from './resolvers/Comment'
import Group from './resolvers/Group'
//import typeDefs from './src/schema.graphql'

import jwt from 'jsonwebtoken';

const SECRET = 'secret...'
/*
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
		email: String!
    group(name: String): [Group]
   # event: [Event] every event create by this user
  }
  type Group {
    id: ID!
    user(name: String): [User!]
    manager: User!
    name: String
    event(title: String): [Event] #every event in this group
  }
  type Event {
    id: ID!
    title: String
		body: String
    time: String
    author: User
  }

	type Token {
		token: String
	}

  # the schema allows the following query:
  type Query {
    me:User
    user(email: String!): User # Find Specific user
		event(title: String!): Event # Find specific event
    group(name: String!): Group # Find specific event
  }

  # this schema allows the following mutation:
  type Mutation {
     deleteUser(id: ID!): User!
     updateUser(id: ID!, data: UpdateUserInput!): User!
     createEvent(data: CreateEventInput!): Event!
     deleteEvent(id: ID!): Event!
     updateEvent(id: ID!, data: UpdateEventInput!): Event!
     createGroup(data: CreateGroupInput!): Group!
     deleteGroup(id: ID!): Group!
     updateGroup(id: ID!, data: UpdateGroupInput!): Group!
	   login(email: String! password: String!): Token
     signup(name: String! email: String! password: String!): User!
  }
    input UpdateUserInput {
      name: String
      email: String
      password: String
    }
		input CreateEventInput {
			title: String!,
			body: String,
      time: String!
		}

		input UpdateEventInput {
			title: String
			body: String
      time: String!
    }
    
    input CreateGroupInput {
      name: String!
    }

    input UpdateGroupInput {
      name: String
    }
`

async function context(request) {
  const token = request.headers.xtoken
  console.log(token)
  if (token) {
    const author = await jwt.verify(token, SECRET);
    console.log("hi"+author);
    //return { author.id };
  }

  return {
    headers,
    secrets,
  };
};*/

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    //Subscription,
    User,
    Event,
    Group
   // Comment
  },
  context: ({ request }) => {
    const token = request.headers['authorization'];

   /* if(token){
      console.log(token)
      const user = jwt.verify(token,SECRET);
      console.log(user);*/
      return {
       // context:user
        context:{ id: '1a4cbbeb-4ab7-4663-9b98-c996d5007da1',
        email: 'CYL010718@gmail.com',
        iat: 1561561022 }
      }
  //}
    //else throw new Error('Please log in first')
    
  },
})
// db,
//pubsub,
/*
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});*/

server.start({ port: process.env.PORT | 4000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 4000}!`)
})
