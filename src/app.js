const express = require("express")
const dbConnect = require("./config/db.js")
const app = express()
const User = require("./models/user.js")

app.use(express.json())

app.post("/signup", async (req,res)=> {
    console.log(req.body);
    
    const user = new User(req.body)

    try {
        await user.save()
        res.send("User added successfully")
    } catch (error) {
        res.status(400).send("Error saving user")
    }
    //res.send("req body testing")
    
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

