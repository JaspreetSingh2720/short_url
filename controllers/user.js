const User = require("../models/user");
const {v4 : uuidv4} = require("uuid")
const {setUser} = require("../service/auth")

async function handleUserSignUp(req, res){
    const {name, email, password} = req.body;
    await User.create({name : name, email : email, password : password})
    
    return res.render("home");
}
async function handleUserLoign(req, res){
    const {email, password} = req.body;
    const
     user = await User.findOne({ email,password})
    if(!user) return res.render("login",{
        error: 'invalid credentials'
    })
    const token = setUser(user);
    res.cookie("token", token);
    // console.log(user)
    return res.redirect("/");
}

module.exports = {handleUserSignUp, handleUserLoign}