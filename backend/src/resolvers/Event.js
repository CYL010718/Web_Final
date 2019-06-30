import { find, filter, findIndex } from 'lodash';
import db from "../db";
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const authorModel = require('../models/authorModel')
const eventModel = require('../models/eventModel')
const groupModel = require('../models/groupModel')
const authors = db.authors;
const groups = db.groups

const Event = {
  author: (parent, _, {context}) =>{
    //(parent)
    return authorModel.findOne({ id: context.id }).then(result => {
    if ( !result) throw new Error ( 'no result author')
    else return result
  })
},
  group: (parent) => groupModel.findOne({id: parent.groupID}).then(result => {
    if ( !result) throw new Error ( 'no result group')
    else return result
  }),
}

export { Event as default }
