require("dotenv").config()
console.log(process.env.MONGO_URL)
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const {userRouter} = require("./routes/user")
const {coursesRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")

app.use(express.json())
app.use("/user",userRouter)

app.use("/admin",adminRouter)

app.use("/course",coursesRouter)

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)

}


main()
console.log("start")


