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
  groupAddUser: (_, {id,email}, {context, pubsub}) => {
    if(!context) throw new Error('Log in first!');
    if(!find(groups, {id: id})) throw new Error('Cannot find group')
    if(!find(authors,{email: email})) throw new Error('Cannot find user')
    let EditedGroup = find(groups, {id: id})
    if(EditedGroup.manager !== context.id) throw new Error('Access denied! Only the manager of the group can add new users');
    let newGroupUser = find(authors,{email: email});
    EditedGroup.users.push(newGroupUser.id);
    newGroupUser.group.push(id);
    return newGroupUser
  },
  quitGroup: (_,{id}, {context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    if(!find(groups, {id: id})) throw new Error('Cannot find group');
    let EditedGroup = find(groups, {id: id});
    if(EditedGroup.users.findIndex (user => user === context.id) === -1) throw new Error("You are not currently in this group")
    let EditedUser = find(authors,{id: context.id});
    const userGroupDeletedIndex = EditedUser.group.findIndex(group => group === id)
    EditedUser.group.splice(userGroupDeletedIndex,1);
    const GroupUserDeletedIndex = EditedGroup.users.findIndex(user => user === context.id);
    EditedGroup.users.splice(GroupUserDeletedIndex,1);
    pubsub.publish('group', {
      group:{
        mutation: 'DELETED',
        userID: context.id,
        data: EditedGroup
      }
      
    })

    return EditedGroup;
  },
  groupChangeManager:(_,{id,email},{context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    if(!find(groups, {id: id})) throw new Error('Cannot find group');
    if(!find(authors,{email: email})) throw new Error('Cannot find user')
    let EditedGroup = find(groups, {id: id});
    if(EditedGroup.manager !== context.id) throw new Error('Access denied! Only the manager of the group can modify this');

    const newManager = find(authors,{email: email});
    EditedGroup.manager = newManager.id;

    return newManager;
  },
  createGroup:(_, {data}, {context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    const id = v4()
    const newGroup = {
      id: id,
      name: data.name,
      users: [context.id],
      manager: context.id,
      events: []
    }
    let currentUser = find(authors, {id: context.id})
    currentUser.group.push(id);
    groups.push(newGroup);
    console.log(newGroup)

    pubsub.publish('group', {
      group:{
        mutation: 'CREATED',
        data: newGroup
      }
      
    })

    return newGroup
  },
  editGroupName:(_,{data},{context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    if(!find(groups, {id: data.id})) throw new Error('Cannot find group')
    let EditedGroup = find(groups, {id: data.id})
    if(EditedGroup.manager !== context.id) throw new Error('Access denied! Only the manager of the group can change GroupName');
    EditedGroup.name = data.name;

    pubsub.publish('group', {
      group:{
        mutation: 'UPDATED',
        data: EditedGroup
      }
      
    })

    return EditedGroup

  },
  deleteGroup:(_,{id},{context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    if(!find(groups, {id: id})) throw new Error('Cannot find group')
    let deletedGroup = find(groups, {id: id})
    if(deletedGroup.manager !== context.id) throw new Error('Access denied! Only the manager of the group can delete the group');
    for (let i = 0; i < deletedGroup.users.length ; i++){
      let modifiedUser = find(authors, {id:deletedGroup.users[i]})
      const userGroupDeletedIndex = modifiedUser.group.findIndex(group => group === id)
      modifiedUser.group.splice(userGroupDeletedIndex,1);
    }
    const deletedIndex = groups.findIndex(group => group.id === id)
    groups.splice(deletedIndex,1);

    pubsub.publish('group', {
      group:{
        mutation: 'DELETED',
        data: deletedGroup
      }
      
    })

    return deletedGroup

  },
  createEvent:(_, {data},{context,pubsub}) => {
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
   // console.log('hi');
    pubsub.publish('event', {
      event:{
        mutation: 'CREATED',
        data: newEvent
      }
      
    })
    //console.log(pubsub.publish);

    return newEvent;
  },

  updateEvent:(_, {data},{context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    let {eventID,title,body,start,end} = data;
    if(!find(events, {id:eventID})) throw new Error('Error. Cannot find event');
    let modifiedEvent = find(events, {id:eventID})

    if(modifiedEvent.authorID !== context.id) throw new Error('Access Denied');
    modifiedEvent.title = title;
    modifiedEvent.body = body;
    modifiedEvent.start = start;
    modifiedEvent.end = end

    pubsub.publish('event', {
      event:{
        mutation: 'UPDATED',
        data: modifiedEvent
      }
      
    })

    return modifiedEvent;
  },
  deleteEvent: (_, {eventID,groupID} , {context,pubsub}) => {
    if(!context){
      throw new Error('Log in first!');
    }
    if(!find(groups, {id:groupID})) throw new Error('Error. Cannot find group');

    let modifiedGroup = find(groups, {id:groupID});
    if(!find(events, {id:eventID})||(modifiedGroup.events.findIndex(event => event === eventID)===-1)) throw new Error('Error. Cannot find event');
    
    let deletedEvent = find(events, {id:eventID})
    if(deletedEvent.authorID !== context.id) throw new Error('Access Denied! Only the author of the event can delete it');
    
    let modifiedGroupIndex = modifiedGroup.events.findIndex(event => event === eventID)
    let modifiedEventIndex = events.findIndex(event => event.id === eventID)
    modifiedGroup.events.splice(modifiedGroupIndex,1);
    
    const [newEvent] = events.splice(modifiedEventIndex,1);

    pubsub.publish('event', {
      event:{
        mutation: 'DELETED',
        data: newEvent
      }
      
    })
    console.log(newEvent)
    return newEvent


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
