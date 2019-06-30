import { v4 } from 'uuid';
import { find, filter, findIndex } from 'lodash';
import jwt from 'jsonwebtoken';
import db from "../db";
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const authorModel = require('../models/authorModel')
const eventModel = require('../models/eventModel')
const groupModel = require('../models/groupModel')
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
    
    var GroupUsers = [];
    var newUserGroups = []
    return groupModel.findOne({id:id}).then(result=>{
      if(!result) throw new Error('Cannot find group');
      else if(result.manager !== context.id) throw new Error('Access denied! Only the manager of the group can add new users');
      else{
        GroupUsers = result.users;
        return authorModel.findOne({email:email}).then(result=>{
          if(!result) throw new Error('Cannot find user')
          else{
            if ( GroupUsers.some(e=>{return e===result.id})) throw new Error('User already in group');
            else{
              GroupUsers.push(result.id)
              newUserGroups = result.group;
              newUserGroups.push(id)
              groupModel.findOneAndUpdate({id:id},{$set:{users:GroupUsers}}).then(result=>{
                if(!result) throw new Error('Cannot find group');
              })
              authorModel.findOneAndUpdate({email:email},{$set:{group:newUserGroups}}).then(result=>{
                if(!result) throw new Error('Cannot find user');
              })
              return result
            }
          }
        })
      }
    })
  },
  //
  changeDefaultGroup:(_,{id},{context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    return groupModel.findOne({id:id}).then(result=>{
      if ( !result.users.some(user=>{return user===context.id})) throw new Error('not in this group!')
      else {
        authorModel.findOneAndUpdate({id:context.id},{$set:{defaultGroup:id}}).then(result=>{
          if(!result) throw new Error('no result');
        })
      }
      return result;
    })
  },
  quitGroup: (_,{id}, {context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    /*
    if(!find(groups, {id: id})) throw new Error('Cannot find group');
    let EditedGroup = find(groups, {id: id});
    if(EditedGroup.users.findIndex (user => user === context.id) === -1) throw new Error("You are not currently in this group")
    */
    var EditedGroup = {}
    return groupModel.findOne({id:id}).then(result=>{
      EditedGroup = result;
      if ( !result)throw new Error('Cannot find group');
      else if (result.users.findIndex (user => user === context.id) === -1) throw new Error("You are not currently in this group")
      else if (result.manager === context.id ) {
        throw new Error("manager connot quit the group! Instead, you can pick a new manager and quit, or delete the group")
      }
      else{
        authorModel.findOne({id: context.id}).then((result=>{
          const userGroupDeletedIndex = result.group.findIndex(group => group === id)
          result.group.splice(userGroupDeletedIndex,1);
          authorModel.findOneAndUpdate({id:context.id},{$set:{group:result.group}}).then(result=>{
            if(!result) throw new Error('error!')
          }).catch(err=>{console.log(err)})
        }))
        const GroupUserDeletedIndex = EditedGroup.users.findIndex(user => user === context.id);
        EditedGroup.users.splice(GroupUserDeletedIndex,1);
        groupModel.findOneAndUpdate({id:id},{$set:{users:EditedGroup.users}}).then(result=>{
          if(!result) throw new Error('error!')
        }).catch(err=>{console.log(err)})
      }
    }).then(()=>{
      pubsub.publish('group', {
        group:{
          mutation: 'DELETED',
          userID: context.id,
          data: EditedGroup
        }
      })
      return EditedGroup;
    })
    /*
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
    */
  },
  groupChangeManager:(_,{id,userID},{context,pubsub}) => {
    /*
    if(!context) throw new Error('Log in first!');
    if(!find(groups, {id: userID})) throw new Error('Cannot find group');
    if(!find(authors,{email: email})) throw new Error('Cannot find user')
    let EditedGroup = find(groups, {id: userID});
    if(EditedGroup.manager !== context.id) throw new Error('Access denied! Only the manager of the group can modify this');

    const newManager = find(authors,{email: email});
    EditedGroup.manager = newManager.id;
    return newManager;
    */
    return  groupModel.findOne({id:id}).then((result)=>{
      if(!result) throw new Error('Cannot find group');
      else if (result.manager !== context.id) throw new Error('Access denied! Only the manager of the group can modify this');
      else{
        return authorModel.findOne({id:userID}).then(result=>{
          if ( !result)throw new Error('Cannot find user');
          else{
            console.log(userID)
            groupModel.findOneAndUpdate({id:id},{$set:{manager:userID}}).then(result=>{
              console.log(result)
              if(!result) throw new Error('Cannot find group');
            })
            
          }
          /*pubsub.publish('group', {
            group:{
              mutation: 'CREATED',
              data: _newGroup
            }
          })*/
          return result;
        })
      }
    })
    
  },
  createGroup:(_, {data}, {context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    const id = v4()
    const _newGroup = {
      id: id,
      name: data.name,
      users: [context.id],
      manager: context.id,
      events: []
    }
    //let currentUser = find(authors, {id: context.id})
    //currentUser.group.push(id);
    let currentUser_group;
    return authorModel.findOne({id: context.id}).then(result=>{
      currentUser_group = result.group
      currentUser_group.push(id);
    }).then(()=>{
      console.log(currentUser_group)
      authorModel.findOneAndUpdate({id:context.id},{$set:{group:currentUser_group}}).then((result=>{
        if(result) console.log(result);
        else{
          console.log('no result')
        }
      })).catch(err=>{console.log(err)})
    }).then(()=>{
      var newGroup  = new groupModel(_newGroup)
      newGroup.save((err) => {
        if (err) {
          console.log(err);
          return}
        // saved!
      })
      //groups.push(newGroup);
      //console.log(newGroup)
  
      pubsub.publish('group', {
        group:{
          mutation: 'CREATED',
          data: _newGroup
        }
        
      })
  
      return _newGroup
    })
  },
  editGroupName:(_,{data},{context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    /*
    if(!find(groups, {id: data.id})) throw new Error('Cannot find group')
    let EditedGroup = find(groups, {id: data.id})
    if(EditedGroup.manager !== context.id) throw new Error('Access denied! Only the manager of the group can change GroupName');
    */
    var EditedGroup = {}
    return groupModel.findOneAndUpdate({id: data.id, manager:context.id},{$set:{name:data.name}}).then(result=>{
      EditedGroup = result;
      if(!result) throw new Error('Cannot find group or you are not the manager')
      else{
        var EditedGroup = {
          id : result.id,
          name : data.name,
          manager : result.manager,
          users : result.users,
          events : result.events
        }
        pubsub.publish('group', {
          group:{
            mutation: 'UPDATED',
            data: EditedGroup
          }
        })
      return EditedGroup
      }
    })
/*
    EditedGroup.name = data.name;

    pubsub.publish('group', {
      group:{
        mutation: 'UPDATED',
        data: EditedGroup
      }
      
    })

    return EditedGroup
*/
  },
  deleteGroup:(_,{id},{context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    /*
    if(!find(groups, {id: id})) throw new Error('Cannot find group')
    let deletedGroup = find(groups, {id: id})
    if(deletedGroup.manager !== context.id) throw new Error('Access denied! Only the manager of the group can delete the group');
    for (let i = 0; i < deletedGroup.users.length ; i++){
      let modifiedUser = find(authors, {id:deletedGroup.users[i]})
      const userGroupDeletedIndex = modifiedUser.group.findIndex(group => group === id)
      modifiedUser.group.splice(userGroupDeletedIndex,1);
    }
    */
    return groupModel.findOneAndDelete({id:id, manager:context.id}).then(result=>{
      if(!result)throw new Error('Cannot find group or you are not the manager')
      else{
        for (let i = 0; i < result.users.length ; i++){
          /*
          let modifiedUser = find(authors, {id:deletedGroup.users[i]})
          const userGroupDeletedIndex = modifiedUser.group.findIndex(group => group === id)
          modifiedUser.group.splice(userGroupDeletedIndex,1);
          */
          let modifiedUser_groups = {}
          authorModel.findOne({id:result.users[i]}).then(result=>{
            //console.log(result)
            if(!result)throw new Error(`user ${result.id}not exist`)
            else{
              modifiedUser_groups = result.group;
              const userGroupDeletedIndex = modifiedUser_groups.findIndex(group => group === id)
              modifiedUser_groups.splice(userGroupDeletedIndex,1);
            }
          }).then(()=>{
              console.log(modifiedUser_groups)
              authorModel.findOneAndUpdate({id:result.users[i]},{$set:{group:modifiedUser_groups}}).then(result=>{
              if(!result) throw new Error(`error`)
            })
          })
        }
      }
      pubsub.publish('group', {
        group:{
          mutation: 'DELETED',
          data: result
        }
      })
      return result
    })
  },
  createEvent:(_, {data},{context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    let {groupID,title,body,start,end} = data;
    //if(!find(groups, {id:groupID})) throw new Error('Error. Cannot find group');
    
    const id = v4()
    const _newEvent = {
      id: id,
      title:title,
      body:body,
      start:start,
      end:end,
      authorID:context.id
    }
    console.log(_newEvent)
    var newEvent = new eventModel(_newEvent)
    let modifiedGroup ={}
    groupModel.findOne({id:groupID})
    .then(result => {
      if(result) {
        console.log(`Successfully found group: ${result}.`)
      } 
      else {
        //console.log(args.id)
        throw new Error("Cannot find group2")
      }
      modifiedGroup =  result;
      modifiedGroup.events.push(id)
    })
    .then(
      ()=>{;
        console.log(modifiedGroup.events)
        groupModel.findOneAndUpdate({id:groupID},{$set:{events:modifiedGroup.events}}).then(result=>{console.log(result)})
      }
    )
    

    //console.log(modifiedGroup)
    newEvent.save((err) => {
      if (err) {
        console.log(err);
        return}
      // saved!
    })
   // //console.log('hi');
    pubsub.publish('event', {
      event:{
        mutation: 'CREATED',
        id: modifiedGroup.id,
        data: newEvent
      }
      
    })
    ////console.log(pubsub.publish);

    return _newEvent;
  },

  updateEvent:(_, {data},{context,pubsub}) => {
    if(!context) throw new Error('Log in first!');
    let {eventID,title,body,start,end} = data;
    /*
    if(!find(events, {id:eventID})) throw new Error('Error. Cannot find event4');
    let modifiedEvent = find(events, {id:eventID})

    if(modifiedEvent.authorID !== context.id) throw new Error('Access Denied');
    modifiedEvent.title = title;
    modifiedEvent.body = body;
    modifiedEvent.start = start;
    modifiedEvent.end = end
    */
    
    return eventModel.findOneAndUpdate({id:eventID},{$set:{
      title:title,
      body:body,
      start:start,
      end:end
    }}).then((result)=>{
      if(!result)throw new Error('Access Denied')
      else{
        pubsub.publish('event', {
          event:{
            mutation: 'UPDATED',
            id: context.id,
            data: {
              authorID:context.id,
              id:eventID,
              title:title,
              body:body,
              start:start,
              end:end
            }
          }
        })
        return {
          id:eventID,
          title:title,
          body:body,
          start:start,
          end:end
        }
      }
    })
  },

  deleteEvent: (_, {eventID,groupID} , {context,pubsub}) => {
    if(!context){
      throw new Error('Log in first!');
    }
    /*
    if(!find(groups, {id:groupID})) throw new Error('Error. Cannot find group');
    let modifiedGroup = find(groups, {id:groupID});
    if(!find(events, {id:eventID})||(modifiedGroup.events.findIndex(event => event === eventID)===-1)) throw new Error('Error. Cannot find event');
    */
    let modifiedGroup;
    let modifiedGroupIndex;
    return groupModel.findOne({id:groupID}).then(result=>{
      if(!result) throw new Error('Error. Cannot find group');
      else{
        if(result.events.findIndex(event => event === eventID)===-1) throw new Error('Error. Cannot find event5')
        eventModel.findOne({id:eventID}).then( result =>{
          if(!result)throw new Error('Error. Cannot find event6')
        })
      }
      modifiedGroup=result;
      modifiedGroupIndex = modifiedGroup.events.findIndex(event => event === eventID)
      modifiedGroup.events.splice(modifiedGroupIndex,1)
    }).then(()=>{
      return eventModel.findOne({id:eventID}).then( (result) =>{
        if ( result.authorID !== context.id) throw new Error(`Access Denied! Only the author of the event can delete it `);
        else{
          groupModel.findOneAndUpdate({id:groupID},{$set:{events:modifiedGroup.events}}).then((result)=>console.log(result))
          pubsub.publish('event', {
            event:{
              mutation: 'DELETED',
              id: groupID,
              data: result
            }
          })
        }
        return result;
      })
    })
    /*
    let deletedEvent = find(events, {id:eventID})
    if(deletedEvent.authorID !== context.id) throw new Error('Access Denied! Only the author of the event can delete it');
    
    let modifiedGroupIndex = modifiedGroup.events.findIndex(event => event === eventID)
    let modifiedEventIndex = events.findIndex(event => event.id === eventID)
    modifiedGroup.events.splice(modifiedGroupIndex,1);
    const [newEvent] = events.splice(modifiedEventIndex,1);
    
    pubsub.publish('event', {
      event:{
        mutation: 'DELETED',
        data: deletedEvent
      }
      
    })
    //console.log(newEvent)
    return newEvent
    */
  },
  deleteUser: (_,{email, password, name}, {context}) => {
    if(!context){
      throw new Error('Log in first!');
    }
    return authorModel.findOneAndDelete({id:context.id})
                                                   .then((result=>{
                                                     //console.log(result)
                                                     return result
                                                   })).catch(err =>{console.log(err)})
  },

  updateUser: (_,{data}, {context}) => {
    if(!context){
      throw new Error('Log in first!');
    }
    let {name, email, password} = data;
    //console.log(email)
    return authorModel.findOne({email:email}).then((result)=>{
        if(result) {
          if (result.id !== context.id) 
            throw new Error('Duplicate Email!')
          else {
            return authorModel.findOneAndUpdate({id:context.id},{$set:{
              name:name,
              email:email,
              password:password
            }}).then((()=>{
                return {
                  id:context.id,
                  name:name,
                  email:email,
                  password:password
                }
              })).catch(err =>{console.log(err)})
          }
        }
        else{
          return authorModel.findOneAndUpdate({id:context.id},{$set:{
              name:name,
              email:email,
              password:password
          }}).then(()=>{
            return {
              id:context.id,
              name:name,
              email:email,
              password:password
            }
          }).catch(err =>{console.log(err)})
        }
      }
   )
  },

  signup: (_, { email, password, name }, { context }) => {
    if (context) {
      throw new Error('Must log out first.');
    }
    var _newAuthor = {
      id: v4(),
      email:email,
      name:name,
      password:password,
      group: [],
      defaultGroup: ''
    }
    var _newGroup = {
      id: v4(),
      users: [_newAuthor.id],
      events: [],
      name:  `${_newAuthor.name} default group `,
      manager: _newAuthor.id,
    }
    _newAuthor.defaultGroup = _newGroup.id;
    _newAuthor.group.push(_newGroup.id)
    //console.log(_newAuthor)
    var newAuthor = new authorModel(_newAuthor);
    var newGroup = new groupModel(_newGroup);
    authorModel.findOne({email:email}).then((result)=>{
        if(result) {
          if (result.id !== context.id) throw new Error('Duplicate Email!')
        }
        else {
          newAuthor.save((err) => {
            if (err) {
              console.log(err);}
            // saved!
          })
          newGroup.save((err) => {
            if (err) {
              console.log(err);}
            // saved!
          })
        }
      }
    )
    return _newAuthor;
  },
  login: (_, { email, password },  {context} ) => {
    return authorModel.findOne({email:email}).then(
      result =>{
        if(!result){
          throw new Error('Account not found')
        }
        else{
          if(result.password!==password)
            throw new Error('Wrong Password.')
            else return { token: jwt.sign({ id: result.id, email: result.email }, SECRET) }
        }
      }
    )
  }
}

export { Mutation as default }
