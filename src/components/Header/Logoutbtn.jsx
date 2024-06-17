import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
function Logoutbtn() {
    const dispatch=useDispatch();
    const logouthandler=()=>{
        authservice.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2  hover:bg-gray-300 rounded-xl'
    onClick={logouthandler}
    >Logout</button>
  )
}

export default Logoutbtn
