import { useEffect } from "react";
import React from "react";
import booksServices from "../../services/books.js";
import { useDispatch, useSelector } from "react-redux";
import { addBooksView, setBooksNumber, setBooksView } from "../../reducers/books.js";
import { removeNotification, setNotification } from "../../reducers/notification.js";
import BookAdminViewEntity from "./BookAdminViewEntity.jsx";
let page = 0;

const BooksAdminViewTable = ()=> 
{
  const booksView = useSelector(state => state.books.booksView)
  const booksNumber = useSelector(state => state.books.booksNumber)
  const dispatch = useDispatch()


  const showMoreHandler = async() =>
  {
    page += 1
    const getBooksResponse = await booksServices.getSpecificBooksPageWithLimit4(page)
    if(getBooksResponse.state)
    {
      if(getBooksResponse.data.length < 4) page -= 1
      dispatch(addBooksView(getBooksResponse.data))
    }
    else
    {
      dispatch(setNotification({state: false, message: getBooksResponse.message}))
      setTimeout(()=>dispatch(removeNotification()), 3000)
    }
  }

  const setInitialBooks = async() =>
  {
    const getBooksResponse = await booksServices.getSpecificBooksPageWithLimit4(page)
    if(getBooksResponse.state)
    {
      dispatch(setBooksView(getBooksResponse.data))
    }
    else
    {
      dispatch(setNotification({state: false, message: getBooksResponse.message}))
      setTimeout(()=>dispatch(removeNotification()), 3000)
    }
  }

  const getBooksNumber = async() =>
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

  useEffect(() => {setInitialBooks()}, [])
  useEffect(() => {getBooksNumber()}, [])

  if(!booksView) return <h3>No books to present.</h3>
  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            { Object.entries(booksView).map(([id, book]) => (
              <BookAdminViewEntity
                key={id}
                book={book}
              />
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {
            Object.entries(booksView).length === booksNumber
            ? null
            : <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800" onClick={showMoreHandler}>
                Show More
              </button>
          }
        </div>
      </div>
    </div>
  );
}

export default BooksAdminViewTable