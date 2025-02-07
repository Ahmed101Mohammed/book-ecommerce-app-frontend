import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Input from '../Input.jsx';
import booksServices from '../../services/books.js';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, setErrorNotification, setNotification } from '../../reducers/notification.js';
import { setBooksNumber, setBookToEdit, updateBookOnView } from '../../reducers/books.js';
const EditingBookForm = () => {

  const user = useSelector(state => state.user)
  if(!user) return
  if(user.userData.role!=='admin') return

  const locatin = useLocation()
  const dispatch = useDispatch()
  const editingBook = useSelector(state => state.books.bookToEdit)
  const navigate = useNavigate()
  const setEditedBook = async () =>
  {
    const searshParams = new URLSearchParams(locatin.search)
    const bookId = searshParams.get("book");
    if(!bookId) return
    const getBookResponse = await booksServices.getBookWithId(bookId)
    if(!getBookResponse.state)
    {
      dispatch(setErrorNotification(getBookResponse.message))
      setTimeout(()=> dispatch(removeNotification()), 3000) 
      navigate('/storebooks')
      return
    }
    dispatch(setBookToEdit(getBookResponse.data))
  }
  useEffect(()=> {setEditedBook()}, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const target = e.target
    const files = target.photo.files
    let photo = files.length > 0
      ? files[0]
      : undefined
    const title = target.title.value
    const description = target.description.value
    const price = parseFloat(target.price.value)
    const quantity = parseInt(target.quantity.value)
    
    const formData = new FormData()
    photo? formData.append('cover', photo) : null
    title? formData.append('title', title) : null
    description? formData.append('description', description) : null
    price? formData.append('price', price) : null
    quantity? formData.append('quantity', quantity) : null

    const accessToken = user.accessToken
    const editBookResponse = await booksServices.editBookWithRefresh(editingBook.id ,formData, accessToken)
    if(!editBookResponse.state)
    {
      dispatch(setNotification({state: false, message: editBookResponse.message}))
      setTimeout(()=> dispatch(removeNotification()), 3000)
    }
    else
    {
      dispatch(updateBookOnView(editBookResponse.data))
      dispatch(setNotification({state: true, message: `The "${title}" book was updated succesfully`}))
      setTimeout(()=>dispatch(removeNotification()), 3000)
    }

  };

  if(!editingBook) return <h2 className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4'>Loading book information ...</h2>
  return (
    <>
        <Link to="/storebooks">
          <div className='fixed top-0 left-0 bg-black opacity-10 w-full h-full z-40'></div>
        </Link>
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-lg p-6 m-auto z-50"
          onClick={(e) => e.stopPropagation()} // Prevents form closure when clicking inside
        >
          <Link to="/storebooks">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </Link>
          <h2 className="text-xl font-semibold mb-4">Edit {editingBook.title} book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            <Input name='photo' type='file' label='Photo' placeholder='Add book cover' accept="image/*"/>
            <Input name='title' type='text' label='Title' placeholder='Book Title' value={editingBook.title}/>
            <fieldset className="mt-5 mb-5 w-full">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Book Description"
                className="block w-full border border-gray-300 rounded-lg p-2 mt-1 max-h-24 min-h-24"
                rows="3"
                defaultValue={editingBook.description}
              ></textarea>
            </fieldset>
            <Input name='price' type='number' label='Price' placeholder='Book Price' step="0.01" value={editingBook.price}/>
            <Input name='quantity' type='number' label='Quantity' placeholder='Book Quantity' value={editingBook.quantity}/>

            <button type="submit" className="w-full bg-teal-600 text-white rounded-lg py-2 hover:bg-teal-500">
              Edit
            </button>
          </form>
      </div>
    </>
  );
};

export default EditingBookForm;
