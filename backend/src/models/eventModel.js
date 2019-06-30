const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const eventSchema = new Schema({
	id: {
		type: String,
		required: [true, 'id is required.']
	},
	authorID: {
		type: String,
		//required: [true, 'author is required.']
	},
	title: {
		type: String,
		required: [true, 'title is required.']
	},
	body: {
		type: String,
	},
	start: {
		type: String,
		required: [true, 'start is required.']
	},
	end: {
		type: String,
		required: [true, 'end is required.']
	},
})

// Creating a table within database with the defined schema
const eventModel = mongoose.model('eventModel', eventSchema)

// Exporting table for querying and mutating
module.exports = eventModel