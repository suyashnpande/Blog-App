import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/features/auth/authApi';

const Register = () => {
    const [email , setEmail] = useState('');
    const [username , setUserName] = useState('');
    const [password , setPassword] = useState('');
    const [message , setMessage] = useState('');
    const navigate= useNavigate();
    const [registerUser, {isLoading}] = useRegisterUserMutation()
    const handleRegister = async(e)=>{
      e.preventDefault();
      const data={
        username,
        email,
        password
      }
      try{
        await registerUser(data).unwrap()
        alert("Registration successful!");
        navigate('/login');
      }
      catch(error){
        setMessage("Registration failed!")
        alert("Registration failed")
      }
    }

    return (
        <div className='max-w-sm bg-white mx-auto p-8 mt-36'>
          <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
          <form 
          onSubmit={handleRegister}
          className='space-y-5 max-w-sm mx-auto pt-8'>
            <input type="text"  value={username}
            onChange={(e)=>setUserName(e.target.value)}
            placeholder='Username'
            required
            className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
            />

            <input type="text"  value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Email'
            required
            className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
            />
    
            <input type="password" value={password}
            onChange={(e)=>setPassword(e.target.value)} 
            placeholder='Password'
            required
            className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
            />
            {
                message && <p className='text-red-500'> {message} </p>
            }
            <button className='w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md'>Login</button>
    
          </form>
          <p className='my-5 text-center'>Already have an account? Please 
            <Link to="/login" className='text-red-700'>Register</Link> here.
          </p>
        </div>
      )
}

export default Register
