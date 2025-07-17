import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'
import { Loader } from 'lucide-react'
import useAuthStore from '../../lib/store/authStore'

const AdminProtectedRoute = ({children }) => {
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
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    if (user.role!='admin') {
        return <Navigate to="/dashboard" state={{ from: location }} replace />
    }
  return children
}

export default AdminProtectedRoute