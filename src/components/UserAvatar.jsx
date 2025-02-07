import React from "react"
import { useSelector } from "react-redux"
import baseUrl from "../services/baseUrl"
import { Link } from 'react-router-dom'
const UserAvatar = (props) =>
{
  const user = useSelector(state => state.user)
  if(!user) return
  const {tailWidth, tailHeight} = props
  return (
    <Link to='/myprofile'>
      <img
        src={`${baseUrl}/uploads/users/${user.userData.avatar}`}
        alt="User Avatar"
        className={`${tailWidth} ${tailHeight} rounded-full`}
      />
    </Link>
  )
}

export default UserAvatar