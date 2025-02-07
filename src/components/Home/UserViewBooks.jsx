import React, { useEffect, useState } from "react";
import booksServices from "../../services/books";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification, setErrorNotification, setNotification } from "../../reducers/notification";
import { addBooksUsersView, setBooksNumber, setBooksUserView } from "../../reducers/books";
import baseUrl from "../../services/baseUrl";
let page = 0;
const BookUserViewCard = ({ book }) => {
  return (
    <div className="w-60 h-96 border rounded-2xl shadow-lg flex flex-col p-4 overflow-hidden">
      <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
        <img
          src={`${baseUrl}/uploads/books-covers/${book.cover}`}
          alt={book.title}
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between mt-2">
        <div>
          <h3 className="text-lg font-semibold truncate">{book.title}</h3>
          {book.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
          )}
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold">${book.price}</span>
          {book.quantity !== undefined && (
            <span className="text-sm text-gray-500">Qty: {book.quantity}</span>
          )}
        </div>
        <button className="mt-2 w-full bg-teal-500 hover:bg-gray-700 text-white rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const UserViewBooks = () => {
  const dispatch = useDispatch()
  const booksUserView = useSelector(state => state.books.booksUserView)
  const booksNumber = useSelector(state => state.books.booksNumber)
  const setInitialBooks = async () =>
  {
    const getBooksResponse = await booksServices.getSpecificBooksPageWithLimit20(0);
    if(!getBooksResponse.state)
    {
      dispatch(setErrorNotification(getBooksResponse.message))
      setTimeout(() => dispatch(removeNotification()))
      return
    }

    dispatch(setBooksUserView(getBooksResponse.data))    
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
      setTimeout(()=> removeNotification(), 3000)
    }
  }

  useEffect(()=> {setInitialBooks()}, [])
  useEffect(() => {getBooksNumber()}, [])

  const loadMoreBooks = async() => {
    page += 1
    const getBooksResponse = await booksServices.getSpecificBooksPageWithLimit20(page)
    if(getBooksResponse.state)
    {
      if(getBooksResponse.data.length < 20) page -= 1
      dispatch(addBooksUsersView(getBooksResponse.data))
    }
    else
    {
      dispatch(setErrorNotification(getBooksResponse.message))
      setTimeout(()=>dispatch(removeNotification()), 3000)
    }
  };

  if(!booksUserView) return <h2 className="text-center">Loading books...</h2>
  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(booksUserView).map(([id, book]) => (
          <BookUserViewCard key={id} book={book} />
        ))}
      </div>
      {
        booksNumber === Object.entries(booksUserView).length
          ? null
          : <button onClick={loadMoreBooks} className="mt-4 bg-blue-300 text-white hover:shadow-xl hover:bg-teal-800 px-4 py-2 rounded-lg">
              Show More Books
            </button>
      }
    </div>
  );
};

export default UserViewBooks;
