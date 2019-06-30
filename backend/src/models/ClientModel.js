const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const ClientSchema = new Schema({
	account: {
		type: String,
		required: [true, 'account is required.']
	},
	password: {
		type: String,
		required: [true, 'password is required.']
	},
	period: {
		type: Number,
		default: 28,
	},
	duration: {
		type: Number,
		default: 7,
	},
	dataNum: {
		type: Number,
	},
	lastStart: { 
		type: String,
	},
	lastEnd: { 
		type: String,
	}
})

// Creating a table within database with the defined schema
const ClientModel = mongoose.model('ClientModel', ClientSchema)

// Exporting table for querying and mutating
module.exports = ClientModel
