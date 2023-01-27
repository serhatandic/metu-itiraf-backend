const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    PROJECT_URL : process.env.PROJECT_URL,
    API_KEY : process.env.API_KEY
}