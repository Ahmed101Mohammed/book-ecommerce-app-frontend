import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notification.js'
const store = configureStore({
  reducer: {
    notification: notificationReducer
  },
})

export default store
