import {create} from 'zustand'
import {persist} from 'zustand/middleware'
const useAuthStore=create(
    persist(
        (set,get)=>({
            user:null,
            token:null,
            isAuthenticated:false,
            setAuth:(userData,token)=>set({
                user:userData,
                token,
                isAuthenticated:true
            }),
            clearAuth:()=>({
                user:null,
                token:null,
                isAuthenticated:false
            }),
            get:()=>get().token
        }),
        {
            name:"auth-storage",
            partialize:(state)=>({
                user:state.user,
                token:state.token,
                isAuthenticated:state.isAuthenticated
            })
        }
    )
)
export default useAuthStore