import React from "react"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
const LoginButton = () =>
{
  const user = useSelector(state => state.user)
  if(user) return
  
  return (
    <Link to='/login'>
      <button className="bg-white text-blue-600 px-4 py-2 rounded-full ml-4 hover:bg-gray-200">
        Login
      </button>
    </Link>
  )
}

export default LoginButton