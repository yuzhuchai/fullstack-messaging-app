const express = require("express")
const router = express.Router()
const Message = require("../models/message.js")
const Photo = require("../models/photo.js")
const User = require("../models/user.js")
const bodyParser = require("body-parser")



// Post route to track new messages
router.post("/", async (req,res,next)=>{
	try{
		const createdMessage = new Message
    const userFound = await User.findById(req.session.userId)
    const photoFound = await Photo.findById(req.body.photoId)

    createdMessage.photo = photoFound
		createdMessage.title = req.body.title
		createdMessage.content = req.body.content
		createdMessage.price = req.body.price
    createdMessage.username = userFound.username
    createdMessage.save()

		res.redirect(`/photos/photo/${photoFound.id}`)
	} catch(err){
		next(err)
	}
})
// Show route

// Edit page

// Delete route
router.delete("/:messageId", async (req, res, next) => {
	try {
		const foundMessage = await Message.findById(req.params.messageId)
		const photoId = await foundMessage.photo

		await Message.findByIdAndRemove(req.params.messageId)
		res.redirect(`/photos/photo/${photoId}`)

	} catch (err) {
		next(err)
	}
})


module.exports = router
