import mongoose from "mongoose";
import bcrypt, { hash } from 'bcryptjs';
const authScheema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    profile:String
})
authScheema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
authScheema.methods.comparePassword=function(inputPassword){
    return bcrypt.compare(inputPassword,this.password)
}
const Auth=mongoose.model('auth',authScheema)
export default Auth