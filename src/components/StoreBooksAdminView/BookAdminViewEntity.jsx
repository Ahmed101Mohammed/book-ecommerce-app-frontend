import React from "react";
import { useDispatch, useSelector } from "react-redux";
import booksServices from "../../services/books";
import { removeBookFromBooksView, setBooksNumber } from "../../reducers/books.js";
import { removeNotification, setErrorNotification, setSuccessNotification } from "../../reducers/notification.js";
import { Link } from 'react-router-dom'
const BookAdminViewEntity = ({ book }) =>
{
  const user = useSelector(state => state.user)
  if(!user) return
  if(user.userData.role !== 'admin') return
  const booksNumber = useSelector(state => state.books.booksNumber)

  const dispatch = useDispatch()
  const deleteHandler = async() =>
  {
    const bookId = book.id
    const deleteBookResponse = await booksServices.deleteBookWithRefresh(bookId, user.accessToken)
    if(deleteBookResponse.state)
    {
      dispatch(removeBookFromBooksView(book))
      dispatch(setBooksNumber(booksNumber - 1))
      dispatch(setSuccessNotification(`The "${book.title}" book deleted successfuly`))
      setTimeout(() => dispatch(removeNotification()), 3000)
    }
    else
    {
      dispatch(setErrorNotification(deleteBookResponse.message))
    }
  }

  return (
    <tr className="border-b border-gray-300">
      <td className="p-3">{book.title}</td>
      <td className="p-3">${book.price.toFixed(2)}</td>
      <td className="p-3">{book.quantity}</td>
      <td className="p-3 flex gap-2">
        <Link to={`editbook/?book=${book.id}`}>
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Edit
          </button>
        </Link>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={deleteHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default BookAdminViewEntity