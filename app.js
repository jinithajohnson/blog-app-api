const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")

const { usermodel } = require("./models/blog")

const app = express()
app.use(cors())
app.use(express.json())

const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)

}

mongoose.connect("mongodb+srv://jinithajohnson:jingov02@cluster0.wo3ieyl.mongodb.net/blogDb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/signup", async (req, res) => {
    let input = req.body
    let hashedPassword = await generateHashedPassword(input.password)
    console.log(hashedPassword)
    input.password = hashedPassword  //passwordine hashed password akan
    let blog = new usermodel(input)
    blog.save()
    res.json({ "status": "success" })
})

app.listen(8080, () => {
    console.log("server running")
})