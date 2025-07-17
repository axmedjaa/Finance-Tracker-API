import axios from 'axios'
import useAuthStore from '../store/authStore'
const api=axios.create({
    baseURL:"https://finance-tracker-api-6c7f.onrender.com/api",
    headers:{
        "Content-Type":"application/json"
    }
})
api.interceptors.request.use((config)=>{
    const token=useAuthStore.getState().token
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})
export default api