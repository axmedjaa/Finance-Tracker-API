import React from 'react'
import LoginForm from '../../components/auth/LoginForm'


const Sigin = () => {
  return (
   <div className='min-h-screen flex flex-col items-center justify-center bg-background'>
        <div className='absolute inset-0 bg-gradient-to-bl from-secondary to-secondary/30'/>
        <div className='z-10 w-full max-w-md px-4'>
            <div className=' mb-4 text-center'>
                <h1 className='text-xl font-bold text-foreground'>welcome</h1>
                <p className='text-muted-foreground'>Log in to your account</p>
            </div>
            <LoginForm/>
        </div>
    </div>
  )
}

export default Sigin