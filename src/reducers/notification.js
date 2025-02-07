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
    },
    setSuccessNotification(state, action)
    {
      const message = action.payload
      return {state: true, message}
    },
    setErrorNotification(state, action)
    {
      const message = action.payload
      return {state: false, message}
    }
  }
})


export const { setNotification, removeNotification, setSuccessNotification, setErrorNotification } = notificationSlice.actions
export default notificationSlice.reducer