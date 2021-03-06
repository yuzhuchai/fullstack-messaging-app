const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	fullName: {type: String},
	password: {type: String, required: true},
	email: String,
	profilePhoto: {
    data: Buffer,
    contentType: String
	}
})

const User = mongoose.model("User",userSchema)
module.exports = User
