const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register controller
const registerUser = async(req, res) => {
    try {
        //user inforrmation from ou resquest body
        const { username, email, password, role } = req.body;

        //check if the user is already exists in our database
        const checkExistingUser = await User.findOne({$or : [{username}, {email}]});
        if(checkExistingUser) {
            return res.status(404).json({
                success : false,
                message : 'User already exists eithe the same username or same email.'
            });
        }

        //hash user passworrd
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user and save in our database
        const newlyCreatedUser = new User({
            username, 
            email, 
            password : hashedPassword,
            role : role || 'user'
        });

        await newlyCreatedUser.save();

        if(newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: 'User registered successfully'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Unabled to register user! Please try again'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            Message: 'Failed to register a new user.'
        });
    }
}

//login controller
const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;
        
        //find if the current user is exists in database or not
        const user = await User.findOne({username});

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exists"
            });
        }

        //if the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials!'
            });
        }

        //create user token
        const accessToken = jwt.sign({
            userId : user._id,
            username : user.username,
            role : user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : '15m'
        });

        res.status(200).json({
            success: true,
            message: 'Login in successfull',
            accessToken
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            Message: 'Failed to login.'
        });
    }
}

const changePassword = async(req, res) => {
    try {
        const userId = req.userInfo.userId;

        //extract old and new password
        const {oldPassword, newPassword} = req.body;

        //find the current logged user
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        //check if the old password is correctly
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isPasswordMatch) {
            return res.status(404).json({
                success: false,
                message: 'Old password is not correctly! Please try again.'
            });
        }

        //has the new password here
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        //update user password
        user.password = newHashedPassword;
        await user.save();

        res.status(200).json({
            sucess: true,
            message: 'Password changed successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            Message: 'Failed to change password.'
        });
    }
}

module.exports = { registerUser, loginUser, changePassword }