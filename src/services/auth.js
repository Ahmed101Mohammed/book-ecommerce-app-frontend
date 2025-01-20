import axios from "axios"

const baseUrl =
    NODE_ENV === 'production'
      ? window.location.origin // Use the production server's origin
      : BACKEND_BASE_URL
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


const sign = async(userData) =>
{
  const {email, password} = userData
  try
  {
    const response = await axios
      .post(`${baseUrl}/auth/login`,
        {email, password}
      )
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const authServices = {
  register,
  sign
}

export default authServices
