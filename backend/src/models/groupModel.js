const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const groupSchema = new Schema({
	id: {
		type: String,
		required: [true, 'id is required.']
	},
	users: {
		type: Array,
	},
	events: {
		type: Array,
	},
	name: {
		type: String,
		required: [true, 'name is required.']
	},
	manager: {
		type: String,
		required: [true, 'manager is required.']
	},
})

// Creating a table within database with the defined schema
const groupModel = mongoose.model('groupModel', groupSchema)

// Exporting table for querying and mutating
module.exports = groupModel