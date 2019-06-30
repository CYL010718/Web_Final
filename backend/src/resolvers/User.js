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

const User = {
   
   group: (parent,args) => {
     //console.log(parent);
     if(!args.name){
        return (parent.group.map(id => {
           return groupModel.findOne({id:id}).then(result=>{
               if ( !result ) console.log('no such group1')
               else { //console.log(result)
                  return result
               }
           })
        }));
     }
     else {
        //if(!find(groups, {name: args.name})) throw new Error('Cannot find group')
        return groupModel.findOne({name: args.name}).then(result =>{
           if ( !result ) console.log('no such group2')
           else {
              if (!parent.group.find(id => id === groupId)) throw new Error('User not in this group')
              return result;
           }
        })
     }
   },
   defaultGroup: (parent,args) => {
      return groupModel.findOne({id:parent.defaultGroup}).then(result=>{
         if( !result)throw new Error('no defaultGroup')
         //console.log(result);
         return result;
      })
   }
}

export { User as default }
