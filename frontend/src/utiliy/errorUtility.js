export const extraErrorMessage=(error)=>{
    if(!error) return
    if(error.response?.data){
        const data=error.response.data
        if(data.errors&&Array.isArray(data.errors)){
            return data.errors.map(err=>err.message).join(',')
        }
        if(data.message){
            return data.message
        }
        if(data.error){
             return data.error
        }
    }
    if(error.response&&!error.response){
            return "Network error. Please check your internet connection.";
    }
    if(error.message){
        return error.message
    }
    return "Network error. Please check your internet connection.";
}