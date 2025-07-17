import Auth from "../models/auth.js";
import { generatorToken } from "../utility/generator.js";
export const register=async(req,res,next)=>{
    const{name,email,password,role,profile}=req.body
    try {
        const exsist=await Auth.findOne({email})
        if(exsist) return res.status(404).json({message:'email already is used'})
        const user=await Auth.create({name,email,password,role,profile})
        const token=generatorToken(user._id)
        res.status(201).json(token)
    } catch (error) {
        next(error)
    }
}
export const login=async(req,res,next)=>{
    const{email,password}=req.body
    try {
        const user=await Auth.findOne({email})
        if(!user||!(await user.comparePassword(password))){
            return res.status(404).json({message:'email or password is wrong'})
        }
        const token=generatorToken(user._id)
        user.password = undefined
        res.status(201).json({token,user})
    } catch (error) {
        next(error)
    }
}