import React from 'react';
import { Link } from 'react-router-dom'
import Input from '../Input.jsx';
import booksServices from '../../services/books.js';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, setNotification } from '../../reducers/notification.js';
import { setBooksNumber } from '../../reducers/books.js';
const CreatingBookForm = () => {

  const user = useSelector(state => state.user)
  if(!user) return

  const dispatch = useDispatch()
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
    const createBookResponse = await booksServices.createBookWithRefresh(formData, accessToken)
    if(!createBookResponse.state)
    {
      dispatch(setNotification({state: false, message: createBookResponse.message}))
      setTimeout(()=> dispatch(removeNotification()), 3000)
    }
    else
    {
      const booksNumber = await booksServices.getBooks()
      if(booksNumber.state) dispatch(setBooksNumber(booksNumber.data.length))
      dispatch(setNotification({state: true, message: `${title} book was added succesfully to store`}))
      setTimeout(()=>dispatch(removeNotification()), 3000)
      target.title.value = ""
      target.photo.value = ""
      target.description.value = ""
      target.price.value = ""
      target.quantity.value = ""
    }

  };

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
          <h2 className="text-xl font-semibold mb-4">Create a New Book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            <Input name='photo' type='file' label='Photo' placeholder='Add book cover' accept="image/*"/>
            <Input name='title' type='text' label='Title' placeholder='Book Title'/>
            <fieldset className="mt-5 mb-5 w-full">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Book Description"
                className="block w-full border border-gray-300 rounded-lg p-2 mt-1 max-h-24 min-h-24"
                rows="3"
              ></textarea>
            </fieldset>
            <Input name='price' type='number' label='Price' placeholder='Book Price' step="0.01"/>
            <Input name='quantity' type='number' label='Quantity' placeholder='Book Quantity'/>

            <button type="submit" className="w-full bg-teal-600 text-white rounded-lg py-2 hover:bg-teal-500">
              Create
            </button>
          </form>
      </div>
    </>
  );
};

export default CreatingBookForm;
