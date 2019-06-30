var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const authorModel = require('../models/authorModel')
const eventModel = require('../models/eventModel')
const groupModel = require('../models/groupModel')

const Query = {
  /*posts: (_, args, { userId }) => posts,
    post: (_, { id }) => {
      const post = find(posts, { id })
      return post;
    },
    author: (_, { id }) => find(authors, { id: id }),*/
    //me: (_, args, { userId }) => find(authors, { id: userId }), //from website 
    user:  (_,args, {context}) => {
      const query = {email: args.email};
      return authorModel.findOne(query)
      .then(result => {
        if(result) {
          ////console.log(`Successfully found user: ${result}.`)
        } else {
          ////console.log("Cannot find user")
          throw new Error("Cannot find user")
        }
        return result
      })
      .catch(err => console.error(`Cannot find user`))
    },
    event: (_, args, {context}) => {
        //console.log(args)
        if(args.id === "") return null
        return eventModel.findOne({id: args.id})
        .then(result => {
          if(result) {
            ////console.log(`Successfully found event: ${result}.`)
          } else {
            ////console.log("Cannot find event")
            ////console.log(args.id)
            throw new Error("Cannot find event1")
          }
          console.log(result)
          return result
        })
        .catch(err => console.error(`Cannot find event2`))
      },
    group: (_, args, {context}) => {
      const query = {id: args.id};
      return groupModel.findOne(query)
      .then(result => {
        if(result) {
          //console.log(`Successfully found group: ${result}.`)
        } else {
          ////console.log("Cannot find group")
          ////console.log(args.id)
          throw new Error("Cannot find group1")
        }
        return result
      })
      .catch(err => console.error(`Cannot find group2`))
    },
    me: (_, args,  {context,pubsub} ) => {
      return authorModel.findOne({ id: context.id})
        .then(result => {
          if(result) {
            ////console.log(`Successfully found me: ${result}.`)
          } else {
            ////console.log("No document matches the provided query.")
          }
          console.log(result)
          return result
        })
        .catch(err => console.error(`Failed to find me: ${err}`))
      }
}

export { Query as default }

