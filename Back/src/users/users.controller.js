'use strict'

const User = require('./users.model')
const deleteFile = require('../utils/deleteFile')

exports.editMyAccount = async (req, res, next) => {
    try{
        let userId = req.user.id
        let data = req.body

        const userExists = await User.findById(userId)
        if(!userExists) return res.status(400).send({message: 'User not found'})

        const existUserName = await User.findOne({username: data.username})
        if(existUserName && existUserName._id != userId) return res.status(400).send({message: 'User name already in use'})

        //let oldImage
        if(req.file){
            // oldImage = userExists.image
            if (userExists.image) {
                deleteFile(userExists.image)
            }
            data.image = req.file.path
        }
        if(req.fileValidationError) return res.status(400).send({message: req.fileValidationError})
        
        const updatedUser = await User.findOneAndUpdate(
            {_id: userId}, 
            data, 
            {new: true}
        ).select('-password')

        return res.status(200).send(updatedUser)

    }catch(error){
        if (error.message == 'Only images are allowed') {
            return res.status(400).send({ message: 'Archivo no permitido' });
        }
        console.log(error)
        next(error)
    }
}

