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
        <>
        <input   
            type="text"
            placeholder="Enter your username eg. Ritik "
            value={userName}
            onChange={(e)=> setUserName(e.target.value)}
        />
        <input
            type="text"
            placeholder="Enter your password eg. Rit@1234 "
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
        />
        <button
           onClick={handleSubmit}
        >
            Submit 
        </button>
        </>
  )
}

export default Login