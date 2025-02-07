import axios from "axios"
import baseUrl from "./baseUrl.js"
import authServices from "./auth.js"

const getBooks = async() =>
{
  try
  {
    const response = await axios
      .get(`${baseUrl}/api/books`)
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const getBookWithId = async(bookId) =>
{
  try
  {
    const response = await axios
      .get(`${baseUrl}/api/books/${bookId}`)
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const getSpecificBooksPageWithLimit4 = async(page) =>
{
  try
  {
    const response = await axios
      .get(`${baseUrl}/api/books/?page=${page}&limit=4`)
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const getSpecificBooksPageWithLimit20 = async(page) =>
{
  try
  {
    const response = await axios
      .get(`${baseUrl}/api/books/?page=${page}&limit=20`)
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const createBook = async(data, accessToken) =>
{
  try
  {
    const response = await axios
      .post(`${baseUrl}/api/books`, data, {headers: { Authorization: `Bearer ${accessToken}`}})
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const createBookWithRefresh = async(data ,accessToken) =>
{
  const response = await createBook(data ,accessToken)
  if(response.state) return response

  const responseOfRefresh = await authServices.refreshToken()
  if(responseOfRefresh.state)
  {
    const responseOfOrigin = await createBook(data, responseOfRefresh.accessToken)
    return responseOfOrigin
  }
  return response
}

const editBook = async(bookId, data, accessToken) =>
{
  try
  {
    const response = await axios
      .put(`${baseUrl}/api/books/${bookId}`, data, {headers: { Authorization: `Bearer ${accessToken}`}})
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const editBookWithRefresh = async(bookId, data ,accessToken) =>
{
  const response = await editBook(bookId, data ,accessToken)
  if(response.state) return response

  const responseOfRefresh = await authServices.refreshToken()
  if(responseOfRefresh.state)
  {
    const responseOfOrigin = await editBook(bookId, data, responseOfRefresh.accessToken)
    return responseOfOrigin
  }
  return response
}

const deleteBook = async(bookId, accessToken) =>
{
  try
  {
    const response = await axios
      .delete(`${baseUrl}/api/books/${bookId}`, {headers: { Authorization: `Bearer ${accessToken}`}})
    return response.data
  }
  catch(error)
  {
    return error.response.data
  }
}

const deleteBookWithRefresh = async(bookId ,accessToken) =>
{
  const response = await deleteBook(bookId ,accessToken)
  if(response.state) return response

  const responseOfRefresh = await authServices.refreshToken()
  if(responseOfRefresh.state)
  {
    const responseOfOrigin = await deleteBook(bookId, responseOfRefresh.accessToken)
    return responseOfOrigin
  }
  return response
}
const booksServices = {
  getBooks,
  createBookWithRefresh,
  getSpecificBooksPageWithLimit4,
  deleteBookWithRefresh,
  getBookWithId,
  editBookWithRefresh,
  getSpecificBooksPageWithLimit20
}

export default booksServices