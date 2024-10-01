const jwt_secret_user = process.env.jwt_secret_user
const jwt_secret_admin = process.env.jwt_secret_admin

module.exports = {
    jwt_secret_admin : jwt_secret_admin,
    jwt_secret_user : jwt_secret_user
}