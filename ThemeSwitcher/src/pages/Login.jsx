import { useState ,useContext } from "react";
import UserContext from "../context/UserContext";

import React from 'react'

function Login() {

    const [userName , setUserName] = useState('');
    const [password , setPassword] = useState('');

    const {setUser }  = useContext(UserContext);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setUser({userName , password});
    }

  return (
        <div className=" mt-24 ml-24  text-center">
         <h1 className="text-xl text-center mb-4"> Context Api Application</h1>
        <input   
            className="border rounded-sm p-1 ml-4"
            type="text"
            placeholder="Enter your username eg. Ritik "
            value={userName}
            onChange={(e)=> setUserName(e.target.value)}
        />
        <input
            className="border rounded-sm p-1 ml-4"
            type="text"
            placeholder="Enter your password eg. Rit@1234 "
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
        />
        <button
           onClick={handleSubmit}
           className="bg-black text-white rounded-sm ml-4 p-1"
        >
            Submit 
        </button>
        </div>
  )
}

export default Login