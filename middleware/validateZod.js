export const validate=(schema)=>(req,res,next)=>{
    const result=schema.safeParse(req.body)
    if(!result.success){
        const formatted=result.error.format()
        return res.status(404).json({
            success:false,
            message:'validation failed',
            error:Object.keys(formatted).map(field=>({
                field,
                message:formatted[field]?._errors?.[0]||'invalid input'
            }))
        })
    }
    next()
}