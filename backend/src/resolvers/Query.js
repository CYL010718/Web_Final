import { find, filter, findIndex } from 'lodash';
import db from "../db";
const authors = db.authors;
const events = db.events;
const groups = db.groups;

const Query = {
  /*posts: (_, args, { userId }) => posts,
    post: (_, { id }) => {
      const post = find(posts, { id })
      return post;
    },
    author: (_, { id }) => find(authors, { id: id }),*/
    //me: (_, args, { userId }) => find(authors, { id: userId }), //from website 
    user:  (_,args, {context}) => {
      if(!find(authors, {email: args.email})) throw new Error("Cannot find user")
      return find(authors, {email: args.email});
    },
    event: (_, args, {context}) => {
        console.log(args);
        if(args.id === "") return null
        if(!find(events, {id: args.id})) throw new Error("Cannot find event")
       
        return find(events, {id: args.id})
            
      },
   /* events: (_, args) => {
      if(!find(groups, {id: args.groupID})) throw new Error("Cannot find group")
      const group = find(groups, {id: args.groupID});

    }*/
    group: (_, args, {context}) => {
      if(!find(groups, {id: args.id})) throw new Error("Cannot find group")
      return find(groups, {id: args.id})
    },
    me: (_, args,  {context,pubsub} ) => {
    //  console.log(pubsub);
       // console.log("hi!"+args);
        return find(authors, { id: context.id})
      }
}

export { Query as default }
