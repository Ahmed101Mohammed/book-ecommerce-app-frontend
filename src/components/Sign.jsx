import React from "react"
import Input from "./Input.jsx"
import bookStoreImage from '../assets/book-store.png'
import authServices from "../services/auth.js"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setNotification, removeNotification } from "../reducers/notification.js"
const Sign = () =>
{
  const dispatch = useDispatch()

  const signHandler = async(event) =>
  {
    event.preventDefault()
    let target = event.target
    let password = target.password.value
    let email = target.email.value
    const response = await authServices.sign({email, password})
    if(!response.state)
    {
      dispatch(setNotification({state: false, message: response.message}))
    } 
    else
    {
      console.log('Access Token:', response.accessToken)
      dispatch(setNotification({state: true, message: 'Accessed successfuly'}))
      target.password.value = ''
      target.email.value = ''
    }
    setTimeout(()=> dispatch(removeNotification()), 5000)
        
  }

  return (
    <main className="flex w-full h-full">
      <div className="grid w-full xl:w-1/2 h-full">
        <form className="place-self-center w-3/4 h-auto shadow-lg p-5" onSubmit={signHandler}>
          <legend className="text-lg font-bold text-teal-950">Buy your favourite books now from
            <span>
              <span className="text-teal-600"> Book</span>
              <span className="text-red-600">er</span>
            </span>
          </legend>
          <Input type='password' name='password' label='your password' placeholder='M9983D$loupy'/>
          <Input type='email' name='email' label='your email' placeholder='monkyDluffy@gmail.com'/>
          <Link to='/register' className="text-teal-600 block mb-2">I do not have an account</Link>
          <button className="bg-teal-800 text-white	text-center font-bold capitalize w-full p-3 rounded">Sign</button>
        </form>
      </div>
      <div className="static w-1/2 h-full rounded-l-lg hidden xl:block">
        <img src={bookStoreImage} className="absolute right-0 rounded-l-lg h-full" alt="Book with fantazy putty smoke out of its' pages." />
      </div>
    </main>
  )
}


export default Sign