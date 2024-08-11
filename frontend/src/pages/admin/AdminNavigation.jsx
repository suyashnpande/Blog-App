import React from 'react'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { logout } from '../../redux/features/auth/authSlice';
// import AdminImg from "../../assests/admin.png"
//admin img pending to put 

const AdminNavigation = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();

    const handleLogout = async ()=>{
        try{
            await logoutUser().unwrap();
            dispatch(logout());
        }
        catch(error){
            console.error("Failed to log out", error)
        }
    }

  return (
    <div>
         <div className='space-y-5 bg-white md:h-[cal(100vh-98px)] flex flex-col justify-between '>
        {/* header */}
      <div>
        <img src={AdminImg} alt="" className='size-14' />
        <p className='font-semibold'>Admin</p>
      </div>
      <hr />

      <ul className='space-y-5 pt-5'>
        <li>
            <NavLink to="/dashboard" 
            end
            className={ ({isActive})=> isActive ? "text-blue-600 font-bold":"text-black" } >
            Dashboard </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/add-new-post" className={ ({isActive})=> isActive ? "text-blue-600 font-bold":"text-black" } >
            Add New Post </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/manage-items" className={ ({isActive})=> isActive ? "text-blue-600 font-bold":"text-black" } >
         Manage Items</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/users" className={ ({isActive})=> isActive ? "text-blue-600 font-bold":"text-black" } >
            Users </NavLink>
        </li>
      </ul>
       </div>

    <div className='mb-3'>
    <hr  className='mb-3'/>
    <button 
    onClick={handleLogout}
    className='text-white bg-red-500 px-5 py-1 rounded-sm'>Logout</button>
    </div>

   </div>
  )
}

export default AdminNavigation
