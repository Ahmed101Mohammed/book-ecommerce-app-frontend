import React from "react"
import { Cancel01Icon } from 'hugeicons-react'
import { useSelector, useDispatch } from "react-redux"
import { removeNotification } from "../../reducers/notification.js"
const Notification = () =>
{
  const dispatch = useDispatch()

  const closeNotification = () =>
  {
    dispatch(removeNotification())
  }
  const notification = useSelector( state => state.notification)
  if(!notification) return
  const backgroundColor = notification.state? "bg-teal-400" : "bg-red-400"
  return (
    <div className={`grid grid-cols-12 fixed bottom-0 left-0 w-full p-3 rounded opacity-80 z-50 ${backgroundColor}`}>
      <p className="col-span-11 text-white"> {notification.message} </p>
      <Cancel01Icon className="col-span-1 text-white cursor-pointer place-self-center" onClick={closeNotification}/>
    </div>
  )
}

export default Notification