import { find, filter, findIndex } from 'lodash';
import db from "../db";
const authors = db.authors;
const groups = db.groups

const Event = {
  author: (parent) => find(authors, { id: parent.authorId }),
  group: (parent) => find(groups, {id: parent.groupID})
}

export { Event as default }
