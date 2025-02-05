import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState,useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/apis/authApi";

const Auth = () => {

    const [signUpInput, setSignUpInput] = useState({
        fullName: "",
        email: "",
        password: "",
      });
    
      const [signInInput, setSignInInput] = useState({
        email: "",
        password: "",
      });

      const [
        registerUser,
        {
          data: registerData,
          error: registerError,
          isLoading: isRegisterLoading,
          isSuccess: isRegisterSuccess,
        },
      ] = useRegisterUserMutation();
      
     

      const [
        loginUser,
        {
          data: loginData,
          error: loginError,
          isLoading: isLoginLoading,
          isSuccess: isLoginSuccess,
        },
      ] = useLoginUserMutation();
    
      const navigate = useNavigate();
      useEffect(()=>{
        if(isRegisterSuccess && registerData){
          toast.success(registerData?.message || "User sign-up successful!");
          navigate("/");
        }
        else if(registerError ){
          toast.error(registerError?.data?.message || "Sign Up Failed!");
          navigate("/auth");
        }
        else if(loginError ){
          toast.error(loginError.data?.message || "Login In Falied!");
          navigate("/auth");
        }
        else if(isLoginSuccess && loginData){
          toast.success(loginData?.message || "Login successful!");
          navigate("/")
        }
      },
      [
        isLoginLoading,isRegisterLoading,loginData,registerData,loginError, registerError
      ])
      
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signUp") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setSignInInput({ ...signInInput, [name]: value });
    }
  };

  const buttonHandler = async (type) => {
    const inputData = type === "signUp" ? signUpInput : signInInput;
    const action = type ==="signUp" ? registerUser : loginUser;
    console.log(inputData);
    await action(inputData);
    setSignInInput({
      email: "",
      password: "",
    });
    setSignUpInput({
      fullName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <Tabs defaultValue="signIn" className="w-[420px]">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="signUp" >SignUp</TabsTrigger>
          <TabsTrigger value="signIn">SignIn</TabsTrigger>
        </TabsList>
        <TabsContent value="signUp">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Enter your details to create a new account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="fullName">Name</Label>
                <Input
                  id="fullName"
                  value={signUpInput.fullName}
                  onChange={(e) => changeInputHandler(e, "signUp")}
                  placeholder="Enter Your Name"
                  name="fullName"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  value={signUpInput.email}
                  onChange={(e) => changeInputHandler(e, "signUp")}
                  id="email"
                  placeholder="abc@xyz.pqr"
                  name="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="........"
                  value={signUpInput.password}
                  onChange={(e) => changeInputHandler(e, "signUp")}
                  name="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                disabled = {isRegisterLoading}
                onClick={() => buttonHandler("signUp")}>
                  {
                    isRegisterLoading? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin "/> Please Wait...
                      </>
                    ) : "Register"
                  }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signIn">
          <Card>
            <CardHeader>
              <CardTitle>Sign-In</CardTitle>
              <CardDescription>
                Bro, Kindly sign-in to track the courses where you had left...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  onChange={(e) => changeInputHandler(e, "signIn")}
                  value={signInInput.email}
                  placeholder="abc@xyz.pqr"
                  name="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => changeInputHandler(e, "signIn")}
                  value={signInInput.password}
                  name="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                disabled = {isLoginLoading}
                onClick={() => buttonHandler("signIn")}>
                  {
                    isLoginLoading? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin "/> Logging...
                      </>
                    ) : "Login"
                  }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
