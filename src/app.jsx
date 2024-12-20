import React, { useState } from 'react'
import './index.css'

const App = () => {
  const [counter, setCounter] = useState(0)
  const baseUrl =
    NODE_ENV === 'production'
      ? window.location.origin // Use the production server's origin
      : BACKEND_BASE_URL
  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello React with webpack {baseUrl}</h1>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
      {counter}
    </>
  )
}

export default App
