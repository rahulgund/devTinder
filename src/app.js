const express = require("express")
const dbConnect = require("./config/db.js")  // Database config
const app = express()
const User = require("./models/user.js")     // User Schema
const bcrypt = require("bcrypt")

// All middlewares
app.use(express.json())

app.post("/signup", async (req,res)=> {

    // validate using validation utils function

    // bcrypt hash password

    const {firstName, lastName, emailId, password,gender} = req.body;
    const passwordHash = await bcrypt.hash(password, 10, )

    // create new instance of User model

    const user = new User({
        //req.body
        firstName,
        lastName,
        emailId,
        gender,
        password:passwordHash
        })
    
    try {
        const xyz= await user.save()
        res.send("User added successfully")
    } 
    catch (error) {
        res.status(400).send("Error saving user" + error.message)
    }
    //res.send("req body testing")
    
})

app.post("/login", async(req, res)=> {
    try {
        const {emailId, password} = req.body
        const user = await User.findOne({ emailId: emailId})
        //console.log(user);
        
        if(!user){
            throw new Error("Email id is not registered")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid){
            //console.log("Login successful");
            res.send("Login successful")
        }
        else{
            throw new Error("Incorrect password")
        }

    } catch (error) {
        res.status(400).send("Error " + error.message)
    }
})


// Get User Data for tinder feed
app.get("/user", async (req,res)=> {
    const userEmail = req.body.emailId

    try {
            const user = await User.findOne({emailId : userEmail})
            res.send(user)
    } 
    catch (error) {
            res.status(401).send("Something went wrong")
    }
})

// Get all users for tinder feed
app.get("/feed", async (req,res)=> {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(401).send("Something went wrong")
    }
})

// Delete user
app.delete("/user", async(req,res)=>{
    const userId = req.body.userId
    try {
        const user = await User.findByIdAndDelete(userId)
        
        res.send("User deleted successfully")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})

// Upadte user info
app.patch("/user", async(req,res)=> {
    const userId = req.body._id
    const data = req.body
    
    try {
        const ALLOWED_UPDATES = ["firstName", "lastName", "age", "gender", "password"]
        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))
        if(!isUpdateAllowed){
            throw new Error("Upadate not allowed")
        }
        await User.findByIdAndUpdate({_id:userId}, data, { runValidators: true})
        res.send("user updated successfully")
    } 
    catch (error) {
        res.status(401).send("Upadate Failed " + error.message)
    }
})

//---------------------------------------------------------
// Root path
app.get("/", (req,res) => {
    res.send("hello dev tinder")
})

// Mongodb Database COnnection
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

