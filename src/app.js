const express = require("express")
const dbConnect = require("./config/db.js")
const app = express()
const User = require("./models/user.js")

app.post("/signup", async (req,res)=> {

    const user = new User({
        firstName:"purva",
        lastName:"gund",
        emailId:"purva@gmail.com",
        password:"123",
        gender:"female"
    })

    try {
        await user.save()
    res.send("User added successfully")
    } catch (error) {
        res.status(400).send("Error saving user")
    }

    
})

app.get("/", (req,res) => {
    res.send("hello dev tinder")
})


dbConnect()
.then(()=> {
    console.log("Database connection successful...");
    app.listen(3000, ()=> {
        console.log("Server is successfully listing on port 3000");
        
    })
    
})
.catch(err => {
    console.error("Database can not be connected")
})

