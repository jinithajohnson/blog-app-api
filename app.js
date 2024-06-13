const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwtoken =require("jsonwebtoken")

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

//app for signin

app.post("/signin",(req,res)=>{
      let input=req.body
      usermodel.find({"email":req.body.email}).then(

        (response)=>{

            if (response.length>0) {
                let dbPassword=response[0].password
                console.log(dbPassword)
                bcrypt.compare(input.password,dbPassword,(error,isMatch)=>{  //order maran padila
                    if(isMatch) {
                        //if login success generate token
                        jwtoken.sign({email:input.email},"blog-app",{expiresIn:"1d"},
                            (error,token)=>{
                                if (error) {
                                    res.json({"status":"unable to create token"})
                                    
                                } else {
                                    res.json({"status":"success","userId":response[0]._id,"token":token})
                                    
                                }
                            }

                        ) //blog app is the name of the token
                        
                    
                     } else{
                        res.json({"status":"incorrect"})
                    }
                })
                
            }
             else {
                res.json({"status":"user not found"})
            }
        }
      ).catch()
})



app.listen(8080, () => {
    console.log("server running")
})