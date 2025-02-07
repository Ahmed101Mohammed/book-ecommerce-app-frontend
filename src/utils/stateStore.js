import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notification.js'
import userReducer from '../reducers/user.js'
import booksReducer from '../reducers/books.js'
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    books: booksReducer,
  },
})

export default store
