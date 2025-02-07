import React from "react"
import { useSelector } from "react-redux"
import AddBookButton from "./AddBookButton.jsx"
import { Link, Outlet } from 'react-router-dom'
import BooksAdminViewTable from "./BooksAdminViewTable.jsx"
const StoreBooksAdminView = ()=>
{
  const user = useSelector(state => state.user)
  if(!user) return
  if(user.userData.role !== 'admin') return
  const style = {
    paddingTop: '84px'
  }
  return(
    <main className="p-4 bg-gray-50 min-h-full" style={style}>
      <BooksAdminViewTable/>
      <Link to="createbook"><AddBookButton/></Link>
      <Outlet/>
    </main>
  )
}

export default StoreBooksAdminView