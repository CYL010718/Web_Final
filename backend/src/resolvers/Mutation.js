import { v4 } from 'uuid';
import { find, filter, findIndex } from 'lodash';
import jwt from 'jsonwebtoken';
import db from "../db";
let authors = db.authors;
let events = db.events;
let groups = db.groups;
const SECRET = 'secret...'

const isAuthenticated = (fn) => {
  return (parent, args, context) => {
    if (!context.userId) throw new Error('Authentication Error.')
    return fn(parent, args, context);
  }
}

const Mutation = {
 /* upvotePost: ((_, { postId }) => {
    const post = find(posts, { id: postId });
    if (!post) {
      throw new Error(`Couldn't find post with id ${postId}`);
    }
    post.votes += 1;
    return post;
  }),
  addPost: isAuthenticated((_, { title, body }, { userId }) => {
    const newPost = {
      id: v4(),
      authorId: userId,
      title,
      body,
      votes: 0
    };
    posts.push(newPost);
    return newPost;
  }),
  updatePost: isAuthenticated((_, { postId, title, body }, { userId }) => {
    const post = find(posts, { id: postId });
    if (post.authorId !== userId) {
      throw new Error('Forbidden');
    }
    post.title = title || post.title;
    post.body = body || post.body;
    return post;
  }),
  deletePost: isAuthenticated((_, { postId }, { userId }) => {
    const post = find(posts, { id: postId });
    if (post.authorId !== userId) {
      throw new Error('Forbidden');
    }
    const index = findIndex(posts, { id: postId });
    posts.splice(index, 1);
    return post;
  }),*/
  createEvent:(_, {data},{context}) => {
    if(!context) throw new Error('Log in first!');
    let {groupID,title,body,start,end} = data;
    if(!find(groups, {id:groupID})) throw new Error('Error. Cannot find group');
    const id = v4()
    const newEvent = {
      id: id,
      title:title,
      body:body,
      start:start,
      end:end,
      authorID:context.id
    }
    events.push(newEvent);
    let modifiedGroup = find(groups, {id:groupID});
    modifiedGroup.events.push(id);
    return newEvent;
  },

  updateEvent:(_, {data},{context}) => {
    if(!context) throw new Error('Log in first!');
    let {eventID,title,body,start,end} = data;
    if(!find(events, {id:eventID})) throw new Error('Error. Cannot find event');
    let modifiedEvent = find(events, {id:eventID})

    if(modifiedEvent.authorId !== context.id) throw new Error('Access Denied');
    modifiedEvent.title = title;
    modifiedEvent.body = body;
    modifiedEvent.start = start;
    modifiedEvent.end = end

    return modifiedEvent;
  },
  
  deleteUser: (_,{email, password, name}, {context}) => {
    if(!context){
      throw new Error('Log in first!');
    }
    if(!find(authors, author => author.id === context.id)) throw new Error('Access denied')
    let deletedAuthor = find(authors, author => author.id === context.id);
    let deletedIndex = findIndex(authors, author => author.id === context.id)
    authors.splice(deletedIndex,1);
    return deletedAuthor
  },

  updateUser: (_,{data}, {context}) => {
    if(!context){
      throw new Error('Log in first!');
    }
    let {name, email, password} = data;
    console.log(email)
    if(!find(authors, author => author.id === context.id)) throw new Error('Access denied')
    let mutatedAuthor = find(authors, author => author.id === context.id);
    mutatedAuthor.email = email || mutatedAuthor.email;
    mutatedAuthor.name = name || mutatedAuthor.name;
    mutatedAuthor.password = password || mutatedAuthor.password;
    return mutatedAuthor
  },

  signup: (_, { email, password, name }, { context }) => {
    if (context) {
      throw new Error('Must log out first.');
    }
    if (find(authors, author => author.email === email)) throw new Error('Duplicate Email!');
    const newAuthor = {
      id: v4(),
      email:email,
      name:name,
      password:password,
      group: []
    }
    authors.push(newAuthor);
    return newAuthor;
  },
  login: (_, { email, password },  {context} ) => {
    console.log(password);
   // if (userId) throw new Error('Already Logged In.')
    const author = find(authors, author => author.email === email);
    if(!author) throw new Error('Account not found')
    if (author.password !== password) throw new Error('Wrong Password.');

    return { token: jwt.sign({ id: author.id, email: author.email }, SECRET) }
  }
}

export { Mutation as default }
