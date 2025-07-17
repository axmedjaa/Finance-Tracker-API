import axios from 'axios'
import useAuthStore from '../store/authStore'
const api_url="https://finance-tracker-api-6c7f.onrender.com/api"
const api=axios.create({
    baseURL:api_url,
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