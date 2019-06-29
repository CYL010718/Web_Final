import { find, filter, findIndex } from 'lodash';
import db from "../db";
const authors = db.authors;
const events = db.events;
const groups = db.groups;

const User = {
   
   group: (parent,args) => {
     let group = [];
   //  console.log(parent);
     if(!args.name){
        group = parent.group.map(id => find(groups, {id: id}));
     }
     else {
        if(!find(groups, {name: args.name})) throw new Error('Cannot find group')
        let groupId = find(groups, {name:args.name}).id;
        if (!parent.group.find(id => id === groupId)) throw new Error('User not in this group')
        group.push(find(groups, {name: args.name})) 

     }
    
     return group
   }
}

export { User as default }
