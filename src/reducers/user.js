import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action)
    {
      const user = action.payload
      return user
    },
    removeUser(state, action)
    {
      return null
    }
  }
})


export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer