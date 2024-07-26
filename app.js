const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {usermodel} = require("./models/blog")
let app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://jinithajohnson:jingov02@cluster0.wo3ieyl.mongodb.net/blogDb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/signup", async (req, res) => {
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password=hashedPassword

   usermodel.find({ email:req.body.email }).then(
    (items)=>{

        if (items.length > 0)  {
            res.json({"status":"email Id already exist"})

        }else  {

            let result=new usermodel(input)
            result.save()
            res.json({"status":"success"})

        }
    }
   ).catch(
    (error) => {}

)
})

app.listen(8000, () => {
    console.log("server running")
})