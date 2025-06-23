import jwt from 'jsonwebtoken'
export const generatorToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}