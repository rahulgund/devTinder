const express = require("express")
const app = express()

app.use("/hello", (req,res)=> {
    res.send("hello node")
})

app.listen(3000, ()=> {
    console.log("Server is successfully listing on port 3000");
    
})