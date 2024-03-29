const bcrypt = require('bcrypt');
const express = require('express')
const jwt = require('jsonwebtoken');
const  userModel  = require('../models/usermodel');
const constants= require("../constants/constant")
const cookieParser = require("cookie-parser")
const app = express();
app.use(cookieParser())

const userSignIn = async (req, res) => {
    try {
        const { email, password,scope } = req.body;
        console.log('req.body', req.body)
        const isUserExist = await userModel.findOne({ email });
        if (isUserExist) {
            return res.status(409).json({ message: 'User already exists',isUserExist });
        }

        const hash = await bcrypt.hash(password, 5);
        const user = new userModel({ email, password: hash,scope });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const adminLoginIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email, scope: constants.SCOPE.ADMIN });

        if (!existingUser) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const hashedPassword = existingUser.password;
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: existingUser._id, scope: existingUser.scope }, 'masai', { expiresIn: '5h' });
        const refreshToken = jwt.sign({ userId: existingUser._id }, 'kasai', { expiresIn: '7d' });

        res.cookie("token",token,{httpOnly:true,maxAge:1000000}).cookie("refreshtoken",refreshToken,{httpOnly:true,maxAge:1000000})
        // Set cookies or send response as needed
        res.status(200).json({
            message: 'Admin Login Successful',
            user: existingUser,
            token,
            refreshToken,
            scope: existingUser.scope,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const customerLoginIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email, scope:  constants.SCOPE.CUSTOMER  });

        if (!existingUser) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        const hashedPassword = existingUser.password;
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: existingUser._id, scope: existingUser.scope }, 'masai', { expiresIn: '5h' });
        const refreshToken = jwt.sign({ userId: existingUser._id }, 'kasai', { expiresIn: '7d' });

        res.cookie("token",token,{httpOnly:true,maxAge:1000000}).cookie("refreshtoken",refreshToken,{httpOnly:true,maxAge:1000000})
        // Set cookies or send response as needed
        res.status(200).json({
            message: 'Customer Login Successful',
            user: existingUser,
            token,
            refreshToken,
            scope: existingUser.scope,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { userSignIn, adminLoginIn, customerLoginIn };
