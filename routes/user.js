const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {jwt_secret_user} = require("../config")
const {userMiddleWare} = require("../middlewares/user")
const userRouter = express.Router()
const {UserModel} = require("../db")
const {PurchaseModel} = require("../db")
const course = require("./course")

userRouter.post("/signup",async function(req,res){
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const hashpassword = await bcrypt.hash(password,5)
    try{
        await UserModel.create({
            email : email,
            password : hashpassword,
            firstName : firstName,
            lastName : lastName
        })
    }catch(e){
        res.json({
            message : "email already exits"
        })
        return;
    }
    res.json({
        message : "you are signed up successfully"
    })
})

userRouter.post("/signin",async function(req,res){
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({
        email : email
    })

    if(!user){
        res.json({
            message : "you are not signed up"
        })
        return
    }

    const hashpassword = user.password
    const compare = await bcrypt.compare(password,hashpassword)
    if(compare){
        const token = jwt.sign({
            userId : user._id
        },jwt_secret_user)

        res.json({
            token : token
        })
    }else{
        res.json({
            message : "invalid credentials"
        })
    }   
})

userRouter.get("/purchases",userMiddleWare,async function(req,res){
    const userId = req.userId
    
    const courses = await PurchaseModel.find({
        userId : userId
    })

    res.json({
        purchases : courses
    })

})

module.exports = {
    userRouter : userRouter
}