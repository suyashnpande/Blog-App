import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {IoMenuSharp} from "react-icons/io5";
import {IoClose} from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import avatarImg from "../assets/commentor.png"
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const navLists = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about-us" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] =useState(false);
    const {user} = useSelector((state)=> state.auth);
    const toggleMenu = ()=> setIsMenuOpen(!isMenuOpen);

    const dispatch = useDispatch();
    const [logoutUser]= useLogoutUserMutation()

    const handleLogout = async()=>{
        try{
            await logoutUser().unwrap();
            dispatch(logout())
        }
        catch(error){

        }
    }

    return (
        <header className='bg-white py-6 border'>
            <nav className='container mx-auto flex justify-between px-5'>
                <a href="/">
                    <img src="/logo.png" alt="Logo" className='h-12' />
                </a>
                <ul className='sm:flex hidden items-center gap-8'>
                    {
                        navLists.map((list, index) => (
                            <li key={index}>
                                <NavLink 
                                    to ={`${list.path}`} 
                                    className={ ({ isActive }) => isActive ? "active" : ""}
                                >
                                    {list.name}
                                </NavLink>
                            </li>
                        ))
                    }

                    {/* render button based on user login activity */}
                    {
                        user && user.role ==="user" ?
                        (
                            <li className='flex items-center gap-3'>
                                <img src={avatarImg} alt="" className='size-8'/>
                                <button 
                                onClick={handleLogout}
                                className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'
                                >
                                   Logout
                                </button> 
                            </li>
                        ): 
                        (
                            <li>
                           <NavLink to="/login">Login</NavLink>
                            </li>
                        )
                    }

                    {
                        user && user.role ==="admin" &&
                        (
                            <li className='flex items-center gap-3'>
                                <img src={avatarImg} alt="" 
                                className='size-8'/>
                                <NavLink to="/dashboard">
                                    <button className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'>Dashboard</button>
                                    DashBoard
                                </NavLink>
                            </li>
                        )
                        
            
                    }

                    
                </ul>

                {/* togglemenu */}
                <div className='flex items-center sm:hidden'>
                    <button
                    onClick={toggleMenu}
                     className='flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500  hover:text-gray-900 '>
                        {
                            isMenuOpen ? <IoClose className='size-6'/> : <IoMenuSharp  className='size-6'/>
                        }
                    </button>
                </div>
            </nav>

            {/* menu items for mobile */}
            {
                isMenuOpen && (
                    <ul className='fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm '>
                    {
                        navLists.map((list, index) => (
                            <li key={index} className='mt-5 px-4'>
                                <NavLink 
                                onClick={()=>setIsMenuOpen(false)}
                                    to={list.path} 
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    {list.name}
                                </NavLink>
                            </li>
                        ))
                    }
                    <li className='px-4 mt-5'>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
                )
            }
        </header>
    );
}

export default Navbar;

