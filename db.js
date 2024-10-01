const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const user = new Schema({
    email : {type : String, unique : true},
    password : String,
    firstName : String,
    lastName : String
})

const admin = new Schema({
    email : {type : String, unique : true},
    password : String,
    firstName : String,
    lastName : String
})

const course = new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId
})
const purchase = new Schema({
    userId : ObjectId,
    courseId : ObjectId
})

const UserModel = mongoose.model("user",user)
const AdminModel = mongoose.model("admin",admin)
const CourseModel = mongoose.model("course",course)
const PurchaseModel = mongoose.model("purchase",purchase)

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}
