const jwt = require("jsonwebtoken")
const {jwt_secret_admin} = require("../config") 
function adminMiddleWare(req,res,next){
    const token = req.headers.token
    try{
        const user = jwt.verify(token,jwt_secret_admin)
        req.userId = user.userId
        next()
    }catch(e){
        res.status(403).json({
            message : "invalid JWT"
        })
    }
}

module.exports = {
    adminMiddleWare : adminMiddleWare
}