import React , {useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../contextapi/AuthState";



function ProtectAuth ({children}){

    const navigate = useNavigate() ;

    const {isLogin} = useAuthState();

    console.log(  "children" ,children , "isLogin" ,)
    
    useEffect(()=>{
 
        if(!isLogin){

            navigate("/login");
            return 
        }
    }, []);

    return (
    <>
    {children}
    </>
    )

}


export default ProtectAuth ;