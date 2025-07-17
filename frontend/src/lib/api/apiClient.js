import axios from 'axios'
import useAuthStore from '../store/authStore'
const api_url="http://localhost:3000/api"
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