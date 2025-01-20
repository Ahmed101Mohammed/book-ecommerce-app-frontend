import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action)
    {
      const notification = action.payload
      return notification
    },
    removeNotification(state, action)
    {
      return null
    }
  }
})


export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer