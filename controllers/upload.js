import Auth from "../models/auth.js";
import cloudinary from "../utility/cloudinary.js";
export const uplodeFile=(req,res,next)=>{
    if(!req.file){
        return res.status(404).json({message:"no file uploaded"})
    }
    const stream=cloudinary.uploader.upload_stream(
        {folder:"profile",resource_type:"auto"},
        async(error,result)=>{
            if(error){
                return next(error)
            }
            await Auth.findByIdAndUpdate(req.user._id,{profile:result.secure_url})
            return res.status(201).json({
                success:true,
                fileUrl:result.secure_url
            })
        }
    )
    stream.end(req.file.buffer)
}