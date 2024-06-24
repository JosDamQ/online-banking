'use strict'

const User = require('./users.model')
const jwt = require('jsonwebtoken')

const { comparePassword, encrypt } = require('../utils/validate')
const deleteFile = require('../utils/deleteFile')

exports.verifyEmail = async (req, res, next) => {
    try{
        const { token } = req.params
        const { id } = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(id)

        if(!user) return res.status(400).send({message: 'User not found'})

        if(user.activate == 1) return res.status(400).send({message: 'User already activated'})
        
        await User.findByIdAndUpdate(id, { activate: 1 });

        return res.status(200).send({message: 'User activated successfully'})
        
    }catch(error){
        console.log(error)
        next(error)
    }
}

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

exports.updatePassword = async (req, res, next) => {
    try{
        let userId = req.user.id
        let data = req.body

        const user = await User.findById(userId)
        if(!user) return res.status(400).send({message: 'User not found'})

        let validatePassword = await comparePassword(data.oldPassword, user.password)
        if(!validatePassword) return res.status(400).send({message: 'Invalid password'})
        
        data.newPassword = await encrypt(data.newPassword)

        await User.findByIdAndUpdate( 
            {_id: userId},
            {password: data.newPassword},
            {new: true}
        )

        return res.status(200).send({message: 'Password updated successfully'})
        
        
        // if(data.password != data.confirmPassword) return res.status(400).send({message: 'Passwords do not match'})
    }catch(error){
        console.log(error)
        next(error)
    }
}

