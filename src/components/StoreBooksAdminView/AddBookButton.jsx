import React from "react"
import { useSelector } from "react-redux"

const AddBookButton = () =>
{
  const user = useSelector(state => state.user)
  if(!user) return
  if(user.userData.role !== 'admin') return

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
        Add New Book
      </button>
    </div>

  )
}

export default AddBookButton