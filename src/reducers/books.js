import { createSlice } from '@reduxjs/toolkit'

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    booksNumber: null,
    booksView: null,
    bookToEdit: null,
    booksUserView: null
  },
  reducers: {
    setBooksNumber(state, action)
    {
      const newState = {...state, booksNumber: action.payload}
      return newState
    },
    setBooksView(state, action)
    {
      const books = action.payload
      const booksView = {}
      for(let book of books)
      {
        if(!booksView[book.id]) booksView[book.id] = book;
      }
      const newState = {...state, booksView: booksView}
      return newState
    },
    addBooksView(state, action)
    {
      const currentBooksView = state.booksView
        ? {...state.booksView}
        : {}
      const books = action.payload
      for(let book of books)
      {
        if(!currentBooksView[book.id]) currentBooksView[book.id] = book;
      }

      const newState = {...state, booksView:currentBooksView}
      return newState
    },
    removeBookFromBooksView(state, action)
    {
      const book = action.payload
      const booksViewCopy = {...state.booksView}
      delete booksViewCopy[book.id]
      return {...state, booksView: booksViewCopy}
    },
    setBooksUserView(state, action)
    {
      const books = action.payload
      const booksUserView = {}
      for(let book of books)
      {
        if(!booksUserView[book.id]) booksUserView[book.id] = book;
      }
      const newState = {...state, booksUserView: booksUserView}
      return newState
    },
    addBooksUsersView(state, action)
    {
      const currentbooksUserView = state.booksUserView
        ? {...state.booksUserView}
        : {}
      const books = action.payload
      for(let book of books)
      {
        if(!currentbooksUserView[book.id]) currentbooksUserView[book.id] = book;
      }

      const newState = {...state, booksUserView:currentbooksUserView}
      return newState
    },
    removeBookFromBooksUserView(state, action)
    {
      const book = action.payload
      const booksUserViewCopy = {...state.booksUserView}
      delete booksUserViewCopy[book.id]
      return {...state, booksUserView: booksUserViewCopy}
    },
    setBookToEdit(state, action)
    {
      const book = action.payload
      const newState = {...state, bookToEdit: book}
      return newState
    },
    updateBookOnView(state, action)
    {
      const updatedBook = action.payload
      const booksViewCopy = {...state.booksView}
      if(!booksViewCopy[updatedBook.id]) return {...state, booksView: booksViewCopy}
      booksViewCopy[updatedBook.id] = updatedBook
      return {...state, booksView: booksViewCopy}
    }
  }
})


export const { setBooksNumber, 
                setBooksView,
                setBooksUserView,
                addBooksView, 
                addBooksUsersView,
                removeBookFromBooksUserView,
                removeBookFromBooksView, 
                setBookToEdit, 
                updateBookOnView 
              } = booksSlice.actions
export default booksSlice.reducer