import axios from "axios"
import authServices from "./auth.js"
import baseUrl from "./baseUrl.js"

const getUserData = async(accessToken) =>
{
  try
  {
    const response = await axios
      .get(`${baseUrl}/api/users/user`,
        {headers:
          {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const getUserDataWithRefresh = async(accessToken) =>
{
  const response = await getUserData(accessToken)
  if(response.state) return response

  const responseOfRefresh = await authServices.refreshToken()
  if(responseOfRefresh.state)
  {
    const responseOfOrigin = await getUserData(responseOfRefresh.accessToken)
    return responseOfOrigin
  }
  return response
}

const usersServices = {
  getUserDataWithRefresh
}

export default usersServices