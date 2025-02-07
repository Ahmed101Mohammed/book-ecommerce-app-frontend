import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import booksServices from '../../services/books.js';
import { setBooksNumber } from '../../reducers/books.js';
import { setNotification } from '../../reducers/notification.js';
import { Link } from 'react-router-dom'

const DashboardCard = (props) =>
{
  const {title, info} = props
  return (
    <div className="p-4 rounded-xl bg-red-100 min-w-fit">
      <h3 className="p-2 mb-8 border-y-2 border-red-300 text-gray-700">{title}</h3>
      <p className="text-center mb-8 text-gray-600">{info}</p>
    </div>
  )
}

const Dashboard = () =>
{
  const user = useSelector(state => state.user)
  if(!user) return
  if(user.userData.role !== 'admin') return

  const booksNumber = useSelector(state => state.books.booksNumber)
  
  const dispatch = useDispatch()
  const getBooksNumber = async()=>
  {
    const getBooksResponse = await booksServices.getBooks()
    if(getBooksResponse.state)
    {
      dispatch(setBooksNumber(getBooksResponse.data.length))
    }
    else
    {
      dispatch(setNotification({state: false, message: getBooksResponse.message}))
    }
  }

  useEffect(() =>
  {
    getBooksNumber()
  }, [])

  return(
    <div className="w-full flex flex-wrap justify-center gap-4">
      {
        booksNumber && !isNaN(booksNumber)
          ? <Link to='/storebooks'><DashboardCard title="Books in your store" info={`${booksNumber}`}/></Link>
          : <Link to='/storebooks'><DashboardCard title="Books in your store" info={`!!`}/></Link>
      }      
    </div>
  )
}

export default Dashboard