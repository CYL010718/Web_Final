const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const authorSchema = new Schema({
	id: {
		type: String,
		required: [true, 'id is required.']
	},
	email: {
		type: String,
		required: [true, 'email is required.']
	},
	password: {
		type: String,
		required: [true, 'password is required.']
	},
	name: {
		type: String,
		required: [true, 'name is required.']
	},
	group: {
		type: Array,
	}
})

// Creating a table within database with the defined schema
const authorModel = mongoose.model('authorModel', authorSchema)

// Exporting table for querying and mutating
module.exports = authorModel