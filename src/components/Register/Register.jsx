import React from "react"
import Input from "../Input.jsx"
import bookStoreImage from '../../assets/book-store.png'
import authServices from "../../services/auth.js"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setNotification, removeNotification } from "../../reducers/notification.js"
const Register = () =>
{
  const dispatch = useDispatch()

  const registerHandler = async(event) =>
  {
    event.preventDefault()
    const target = event.target
    const name = target.name.value
    const password = target.password.value
    const email = target.email.value
    const response = await authServices.register({name, email, password})
    if(!response.state)
    {
      dispatch(setNotification({state: false, message: response.message}))
    } 
    else
    {
      dispatch(setNotification({state: true, message: 'Your account is created'}))
      target.password.value = ''
      target.email.value = ''
    }
    setTimeout(()=> dispatch(removeNotification()), 5000)
        
  }

  return (
    <main className="flex w-full h-full">
      <div className="grid w-full xl:w-1/2 h-full">
        <form className="place-self-center w-3/4 h-auto shadow-lg p-5" onSubmit={registerHandler}>
          <legend className="text-lg font-bold text-teal-950">Buy your favourite books now from
            <span>
              <span className="text-teal-600"> Book</span>
              <span className="text-red-600">er</span>
            </span>
          </legend>
          <Input type='text' name='name' label='your name' placeholder='Monky D Luffy'/>
          <Input type='email' name='email' label='your email' placeholder='monkyDluffy@gmail.com'/>
          <Input type='password' name='password' label='your password' placeholder='M9983D$loupy'/>
          <Link to='/login' className="text-teal-600 block mb-2">I already have an account</Link>
          <button className="bg-teal-800 text-white	text-center font-bold capitalize w-full p-3 rounded">register</button>
        </form>
      </div>
      <div className="static w-1/2 h-full rounded-l-lg hidden xl:block">
        <img src={bookStoreImage} className="absolute right-0 rounded-l-lg h-full" alt="Book with fantazy putty smoke out of its' pages." />
      </div>
    </main>
  )
}


export default Register