import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userId} = useParams();
  return (
    <div className='h-36'>
         <h1 className='text-center text-3xl m-3 '>Hello , {userId}</h1>

    </div>
   
  )
}

export default User