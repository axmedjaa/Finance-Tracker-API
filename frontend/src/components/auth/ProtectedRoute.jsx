import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import api from '../../lib/api/apiClient'

import { Navigate, useLocation } from 'react-router'
import { Loader } from 'lucide-react'
import useAuthStore from '../../lib/store/authStore'
const ProtectedRoute = ({children}) => {
    const{user, setAuth, clearAuth, token}=useAuthStore()
    const location=useLocation()
    const{ data,error,isLoading,isError,isSuccess}=useQuery({
        queryKey:['currentUser'],
        queryFn:async()=>{
            const responese=await api.get('/auth/profile',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return responese.data
        },
        retry:1
    })
    useEffect(()=>{
        if(error){
            clearAuth()
        }
    },[isError,error,clearAuth])
    useEffect(() => {
        if (isSuccess && data) {
            setAuth(data, token)
        }

    }, [isSuccess, data, setAuth, token])
     if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin' />
            </div>
        )
    }
    if (isError) {
        return <Navigate to="/signin" state={{ from: location }} replace />
    }
    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />
    }
  return children 
}

export default ProtectedRoute