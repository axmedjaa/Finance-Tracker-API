import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'
const Signup = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-background'>
        <div className='absolute inset-0 bg-gradient-to-bl from-secondary to-secondary/30'/>
        <div className='z-10 w-full max-w-md px-4'>
            <div className=' mb-4 text-center'>
                <h1 className='text-xl font-bold text-foreground'>join us</h1>
                <p className='text-muted-foreground'>Create your account</p>
            </div>
            <RegisterForm/>
        </div>
    </div>
  )
}

export default Signup