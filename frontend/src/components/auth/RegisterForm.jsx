import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import {useMutation} from '@tanstack/react-query'
import api from "../../lib/api/apiClient";
import { extraErrorMessage } from "../../utiliy/errorUtility";
function RegisterForm() {
  const[formValue,setFormValue]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const[error,setError]=useState(null)
    const navigate=useNavigate()
    const registerMutation=useMutation({
      mutationFn:async(userData)=>{
        const response=await api.post('/auth/register',userData)
        return response.data
      },
      onSuccess:()=>{
        navigate("/signin")
      },
      onError:(error)=>{ 
        console.log(error)
        setError(extraErrorMessage(error))
      }
    })
    const handleChange=(e)=>{
      const{name,value}=e.target
      setFormValue({...formValue,[name]:value})
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      setError(null)
      if(!formValue.name||!formValue.email||!formValue.password){
        setError('all fields required')
        return
      }
      if(formValue.password!==formValue.confirmPassword){
        setError('password doesnt match')
        return
      }
      // mutation
      registerMutation.mutate({
        name:formValue.name,
        email:formValue.email,
        password:formValue.password
      })
    }
  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl text-center">create an account</CardTitle>
        <CardDescription className={"text-center"}>enter your detail to register</CardDescription>
        <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2 pt-0">
          {
            error&&(
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )
          }
          <div className="space-y-2">
            <div className="text-sm font-medium text-left">full name</div>
            <Input name="name"  placeholder="john doe" required value={formValue.name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-left">email</div>
            <Input name="email"   placeholder="example@gmail.com" required value={formValue.email} onChange={handleChange}  />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-left">password</div>
            <Input name="password" type="passowrd"   placeholder="******" required value={formValue.password} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-left">
              confirm password
            </div>
            <Input name="confirmPassword" type="passowrd"  placeholder="******" required value={formValue.confirmPassword} onChange={handleChange}  />
          </div>
          <div className="py-4 ">
           <Button type="submit" className={"w-full cursor-pointer"}>
      {registerMutation.isPending? (
        <span className="flex items-center gap-2">
          <LoaderCircle /> creating account....
        </span>
      ) : (
        "create account"
      )}
    </Button>
          </div>
        </CardContent>
        </form>
        <CardFooter className={"flex justify-center pt-0"}>
          <div className="text-sm text-center">
            already have an account{" "}
            <a
              onClick={() => navigate("/signin")}
              className="text-primary hover:underline cursor-pointer"
            >
              sign in
            </a>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}

export default RegisterForm;
