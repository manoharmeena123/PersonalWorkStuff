const express = require('express')
const { userSignIn, adminLoginIn, customerLoginIn } = require("../controllers/userController")

const userRoutes = express.Router()
const cookieParser = require('cookie-parser');
userRoutes.use(cookieParser());
userRoutes.post("/auth/sign", userSignIn);
userRoutes.post("/auth/admin/login", adminLoginIn);
userRoutes.post("/auth/customer/login", customerLoginIn);

 module.exports ={
    userRoutes
 }