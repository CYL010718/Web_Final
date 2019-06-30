import { find, filter, findIndex } from 'lodash';
import db from "../db";
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const authorModel = require('../models/authorModel')
const eventModel = require('../models/eventModel')
const groupModel = require('../models/groupModel')
const authors = db.authors;
const events = db.events;
const groups = db.groups;

const Group = {
    manager: (parent ,arg) => {
       //return (find(authors, {id: parent.manager}))
       return authorModel.findOne({id: parent.manager}).then(
           result => {return result}
       )
    },

    user: (parent,arg) => {
        let users = [];
        if(!arg.name)  {
            return parent.users.map(id => {
                return authorModel.findOne({id: id}).then(
                    result => {return result}
                )
            });
        }
        else{ 
            //if(!find(authors, {name: arg.name})) throw new Error('Cannot find user')
            //let userId = find(authors, {name: arg.name}).id;
            return authorModel.findOne({email:arg.email}).then(result=>{
                if(!result)throw new Error('Cannot find user')
                else{
                    if (!parent.users.find(id => id === result.id)) throw new Error('User not in this group')
                    //console.log([result])
                    return [result]
                }
            })
            //users.push(find(authors, {name: arg.name})) 
        } 
    },
    event: (parent, arg) => {
        
        let event = [];
        if(!arg.title)  {
            //event = parent.events.map(id => find(events, {id: id}));
            return parent.events.map(id => eventModel.findOne({id:id}).then(
                result => {return result}
            ));
        }
    }
   /*event: (author) => filter(events, { authorId: author.id }),
   group: (author) => filter(groups, { authorId: author.id }),*/
}

export { Group as default }
