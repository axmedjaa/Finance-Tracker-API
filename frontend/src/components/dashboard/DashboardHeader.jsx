import React from 'react'
import useAuthStore from '../../lib/store/authStore'
import { Button } from '../ui/button'
import {useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router'
import { DollarSign, LayoutDashboard } from 'lucide-react'
export const DashboardHeader = () => {
    const{user,clearAuth}=useAuthStore()
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const handleLogout=()=>{
        if(confirm("are you sure you want to logout?")){
            clearAuth()
            queryClient.clear()
            navigate("/signin",{replace:true})
        }
    }
  return (
    <header className='bg-card border-b border-border shadow-sm'>
        <div className='w-full flex items-center justify-between p-4 max-w-7xl mx-auto'>
            <div className='flex items-center gap-2'>
                <DollarSign  className='h-6 w-6 text-primary'/>
               <h1 className='text-2xl font-bold capitalize'>Finance Manager</h1>
            </div>
            <div className='flex items-center gap-4'>
                    <h2 className='text-sm text-muted-foreground'>welcome</h2>
                <p className='font-medium'>{user.name}</p>
                <Button variant={'destructive'} onClick={handleLogout}>logOut</Button>
            </div>
        </div>
    </header>
  )
}
