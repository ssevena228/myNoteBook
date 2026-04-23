import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASEURLS } from "./../BaseUrls";
import { errorEmitter, successEmitter } from "../ToastifyEmitter";

export const authContext = createContext(null)


function AuthState({children}) {

    const [loader, setLoader] = useState(false) ;

    const [isLogin , setIsLogin] = useState(localStorage.getItem('token') || false)

    const [profile , setProfile] = useState(null)

    const [checker , setChecker] = useState(false) ;
    

 const navigate = useNavigate();

    const signupFunc =  async (signUser , setSignUser) =>{

      setLoader(true);

       try {
      const res = await fetch(`${BASEURLS}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUser),
      });

      // res.send("User created");
      const data = await res.json();

      console.log("fetch(${BASEURLS}/auth/signup" , data)
      if (data.success) {
        setSignUser({ name: "", email: "", password: "" });
        successEmitter(data.message);
        navigate("/login");
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
        }
    }


    const loginFunc   = async (loginUser , setLoginUser)=>{
      setLoader(true);

       try {

        const res =   await fetch(`${BASEURLS}/auth/login`,{
             method:"POST",
             headers:{
              "Content-Type": "application/json",
             },
             body:JSON.stringify(loginUser)
          });

          const data = await res.json();
          console.log(data)

          if(data.success){
            localStorage.setItem("token" , data.token)
            setProfile(data.user)
            setIsLogin(data.token)
            setLoginUser({email:"" , password:""})
            successEmitter(data.message);
            navigate("/")
          }else{
            errorEmitter(data.message)
          }
        
       } catch (error) {
        console.log(error)
       }finally{
        setLoader(false);
       }
    };


   const getProfileFunc = async () => {
  setChecker(true);

  try {
    const res = await fetch(`${BASEURLS}/auth/profile`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log("res" , res)
    const data = await res.json();
    console.log("data is" , data)
    if (data.success) {
      setProfile(data.user);
    } else {
      setProfile(null);
    }

  } catch (error) {
    console.log(error);
  } finally {
    setChecker(false);
  }
};


  console.log("profile" ,profile) 

    const logoutFunc = () =>{

      localStorage.removeItem("token");
      setIsLogin(false);
      setProfile(null);
      successEmitter("Logout successfully")
      navigate('/login')

    }





  return (
    <authContext.Provider
     value={{
      loader ,
       signupFunc  , 
       loginFunc ,
       logoutFunc, 
       isLogin  ,
       profile,
       getProfileFunc,
       checker
       }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthState;

export const useAuthState = ()=> useContext(authContext)
