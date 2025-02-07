import React from "react"
import UserViewBooks from "./UserViewBooks.jsx"

const Home = () =>
{
  const style = {
    padding: '20px',
    paddingTop: '84px',
  }

  return (
    <main className="min-h-full" style={style}>
        <UserViewBooks/>
    </main>
  )
}

export default Home