import { find, filter, findIndex } from 'lodash';
import db from "../db";
const authors = db.authors;

const Event = {
  author: (parent) => find(authors, { id: parent.authorId }),
}

export { Event as default }
