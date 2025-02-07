import axios from "axios"
import baseUrl from "./baseUrl"

const register = async(userData) =>
{
  const {name, password, email} = userData
  try
  {
    const response = await axios
      .post(`${baseUrl}/auth/register`, 
        {name, password, email})
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}


const login = async(userData) =>
{
  const {email, password} = userData
  try
  {
    const response = await axios
      .post(`${baseUrl}/auth/login`,
        {email, password},
        { withCredentials: true }
      )
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const refreshToken = async() =>
{
  try
  {
    const response = await axios
      .get(`${baseUrl}/auth/refreash`, { withCredentials: true })
      return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const authServices = {
  register,
  login,
  refreshToken
}

export default authServices
