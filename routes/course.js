const express = require("express")

const coursesRouter = express.Router()
const {userMiddleWare} = require("../middlewares/user")
const {PurchaseModel,CourseModel} = require("../db")
coursesRouter.get("/preview",async function(req,res){
    // all the current courses available on the website
    // does not need any authentication
    const courses = await CourseModel.find({})
    res.json({
        courses : courses
    })
})

coursesRouter.post("/purchase",userMiddleWare,async function(req,res){
    // here the user purchases the course
    const userId = req.userId
    const courseId = req.body.courseId

    await PurchaseModel.create({
        userId : userId,
        courseId : courseId
    })

    res.json({
        message : "course purchased successfully"
    })
})

module.exports = {
    coursesRouter : coursesRouter
}