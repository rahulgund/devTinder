const mongoose = require("mongoose")


const dbConnect = async ()=> {
    await mongoose.connect("mongodb+srv://ernstaugustofhanover:LnwFz9thaIvok79j@nodejs-with-express.pj9ltie.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Nodejs-with-express")
}

module.exports = dbConnect