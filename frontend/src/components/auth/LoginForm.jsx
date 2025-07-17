import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
// import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import api from "../../lib/api/apiClient";
import { extraErrorMessage } from "../../utiliy/errorUtility";
import useAuthStore from "../../lib/store/AuthStore";
function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const{setAuth}=useAuthStore()
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post('/auth/login',credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // todo handletoken
      if(data.token){
        const user=data.user
        const token=data.token
        setAuth(user,token)
        navigate("/dashboard")
      }
    },
    onError: (error) => {
      console.log(error);
      setError(extraErrorMessage(error));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formValues.email || !formValues.password) {
      setError("All fields are required");
      return;
    }

    loginMutation.mutate({
      email: formValues.email,
      password: formValues.password,
    });
  };
  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl text-center">sign in</CardTitle>
        <CardDescription className={"text-center"}>
          Enter your credentials to access your account
        </CardDescription>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2 pt-0">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">email</div>
              <Input
                name="email"
                placeholder="example@gmail.com"
                required
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">password</div>
              <Input
                name="password"
                type="password"
                placeholder="******"
                required
                value={formValues.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="py-4">
              <Button type="submit" className={"w-full cursor-pointer"}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle /> creating account....
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </CardContent>
        </form>
        <CardFooter className={"flex justify-center pt-0"}>
          <div className="text-sm text-center">
            Don't have an account ?
            <a
              onClick={() => navigate("/signup")}
              className="text-primary hover:underline cursor-pointer"
            >
              sign up
            </a>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}

export default LoginForm;
