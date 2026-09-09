import React from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function Profile() {
    const {user} = useContext(UserContext);

  return (
    <h2 className='text-center font-bold text-lg mt-4'> Hey! {user?.userName }, welcome</h2>
  )
}
