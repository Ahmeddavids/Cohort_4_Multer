const UserModel = require('../model/userModel.js');
const fs = require('fs');

exports.signUp = async (req, res) => {
    try {
        const { name, stack } = req.body;
        const user = new UserModel({
            name,
            stack,
            image: req.file.filename
        })

        await user.save();
        res.status(201).json({
            message: 'User created successfully',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOne = async (req, res) => {
    try {
        const { id } = req.params
        const oneUser = await UserModel.findById(id);
        if (!oneUser) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        res.status(200).json({
            message: 'User details',
            data: oneUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const users = await UserModel.find();
        if (users.length === 0) {
            return res.status(404).json({
                message: 'No user found in this database'
            })
        }
        res.status(200).json({
            message: 'Users details',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, stack } = req.body;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const data = {
            name: name || user.name,
            stack: stack || user.stack,
            image: user.image
        }
        // Check if the user is passing a image
        if (req.file && req.file.filename) {
            // Dynamically get the old image path
            const oldFilePath = `uploads/${user.image}`
            // Check if the file exists inside of the path
            if (fs.existsSync(oldFilePath)) {
                // Delete the existing image
                fs.unlinkSync(oldFilePath)
                // Update the data object
                data.image = req.file.filename
            }
        }
        // Update the changes to our database
        const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });
        // Send a succes response to the user
        res.status(200).json({
            message: 'User details updated successfully',
            data: updatedUser
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
         // Dynamically get the old image path
         const oldFilePath = `uploads/${user.image}`
         // Check if the file exists inside of the path
         if (fs.existsSync(oldFilePath)) {
             // Delete the existing image
             fs.unlinkSync(oldFilePath)
         }
        const deletedUser = await UserModel.findByIdAndDelete(id);
        // Send a succes response to the user
        res.status(200).json({
            message: 'User details deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}