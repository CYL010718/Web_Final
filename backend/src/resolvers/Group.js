import { find, filter, findIndex } from 'lodash';
import db from "../db";
const authors = db.authors;
const events = db.events;
const groups = db.groups;

const Group = {
   manager: (parent ,arg) => {
       return (find(authors, {id: parent.manager}))
    },

    user: (parent,arg) => {
        let users = [];
        if(!arg.name)  {
            users = parent.users.map(id => find(authors, {id: id}));
        }
        else{ 
            if(!find(authors, {name: arg.name})) throw new Error('Cannot find user')
            let userId = find(authors, {name: arg.name}).id;
            if (!parent.users.find(id => id === userId)) throw new Error('User not in this group')
            users.push(find(authors, {name: arg.name})) 
              
        } 
        return users   
    },
    event: (parent, arg) => {
        
        let event = [];
        if(!arg.title)  {
            event = parent.events.map(id => find(events, {id: id}));
        }
        else{ 
            if(!find(events, {title: arg.title})) throw new Error('Cannot find event')
            let eventId = find(events, {title: arg.title}).id;
            if (!parent.events.find(id => id === eventId)) throw new Error('Event not in this group')
            event.push(find(events, {title: arg.title}))   
        } 
        return event 
    }
   /*event: (author) => filter(events, { authorId: author.id }),
   group: (author) => filter(groups, { authorId: author.id }),*/
}

export { Group as default }
