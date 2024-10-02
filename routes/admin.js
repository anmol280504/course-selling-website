const express = require("express")
const adminRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {jwt_secret_admin} = require("../config")
const {adminMiddleWare} = require("../middlewares/admin")
const {AdminModel} = require("../db")
const {CourseModel} = require("../db")
const admin = require("../middlewares/admin")

adminRouter.post("/signup",async function(req,res){
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const hashpassword = await bcrypt.hash(password,5)
    try{
        await AdminModel.create({
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

adminRouter.post("/signin",async function(req,res){
    const email = req.body.email
    const password = req.body.password

    const admin = await AdminModel.findOne({
        email : email
    })

    if(!admin){
        res.json({
            message : "you are not signed up"
        })
        return
    }

    const hashpassword = admin.password
    const compare = await bcrypt.compare(password,hashpassword)
    if(compare){
        const token = jwt.sign({
            userId : admin._id
        },jwt_secret_admin)

        res.json({
            token : token
        })
    }else{
        res.json({
            message : "invalid credentials"
        })
    }
})

adminRouter.post("/course",adminMiddleWare,async function(req,res){
    //adding a new course by admin/creator
    const adminId = req.userId
    const {title,description,imageUrl,price} = req.body

    const course = await CourseModel.create({
        title : title,
        description : description,
        imageUrl : imageUrl,
        price : price,
        creatorId : adminId
    })

    res.json({
        message : "new course added successfully",
        courseId : course._id
    })

})

adminRouter.put("/course",adminMiddleWare,async function(req,res){
    const adminId = req.userId
    const {title,description,imageUrl,price,courseId} = req.body

    // creator should update only his/her course not anyone else's courses
    await CourseModel.updateOne({
        _id : courseId,
        creatorId : adminId
    },
        {
        title : title,
        description : description,
        imageUrl : imageUrl,
        price : price,
    })

    res.json({
        message : "course updated"
    })
})

adminRouter.get("/course/bulk",adminMiddleWare,async function(req,res){
    const adminId = req.userId
    console.log(adminId)
    const courses = await CourseModel.find({
        creatorId : adminId
    })
    res.json({
        courses : courses
    })
})  

adminRouter.get("/name",adminMiddleWare,async function(req,res){
    const userId = req.userId
    try{
        const dbresponse = await AdminModel.findOne({
            _id : userId
        })
        
        res.json({
            firstname : dbresponse.firstName,
            lastname : dbresponse.lastName
        })
    }catch(e){
        res.json({
            message : "Error connecting to DB"
        })
    }   
})

module.exports = {
    adminRouter : adminRouter
}
