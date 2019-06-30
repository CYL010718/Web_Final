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

var mongoose = require('mongoose');
var uri = "mongodb+srv://new-Robert:1234@cluster0-r7rxv.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true , useFindAndModify: false });
mongoose.Promise = global.Promise;
var _db = mongoose.connection;
_db.on('error', error => {
  ////console.log(error)
})

_db.once('open', () => {
  let memory_token;
  const SECRET = 'secret...'

  const pubsub = new PubSub()

  const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
      Query,
      Mutation,
      Subscription,
      User,
      Event,
      Group
    // Comment
    },
    context: ({ request }) => {
      if(request){
        const token = request.headers.authorization;
        ////console.log(request)
        if(token){
          
          const user = jwt.verify(token,SECRET);
          memory_token = token;
        // //console.log(user);
          return {
          context:user,
          pubsub: pubsub
          /* context:{ id: '1a4cbbeb-4ab7-4663-9b98-c996d5007da1',
            email: 'CYL010718@gmail.com',
            iat: 1561561022 }*/
          }
        }
        else throw new Error('Please log in first')
      }
      else{
      // //console.log(memory_token)
        return{
          context: memory_token,
          pubsub: pubsub
        }
      }
      },
    // pubsub
    
  })
  // db,
  //pubsub,
  /*
  server.listen().then(({ url }) => {
    //console.log(`Server ready at ${url}`);
  });*/

  server.start({ port: process.env.PORT | 4000 }, () => {
    //console.log(`The server is up on port ${process.env.PORT | 4000}!`)
  })
})
