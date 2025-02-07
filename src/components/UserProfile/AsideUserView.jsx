import React from "react"
import UserAvatar from '../UserAvatar.jsx';
import { useDispatch, useSelector } from 'react-redux';

const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 ease-in-out"
  >
    {children}
  </button>
);

const AsideUserView = () =>
{
  const user = useSelector(state => state.user)
  const style = {
    height: '91%', // Consider dynamic height based on content
  };

  return (
    <aside
      className="flex flex-col items-center text-gray-800 p-6 bg-gray-100 fixed bottom-0 left-0 w-64 shadow-l"
      style={style}
    >
      <div className="mb-6">
      <UserAvatar tailWidth='w-40' tailHeight='w-40'/>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">{user.userData.name}</h2>
      <nav className="flex flex-col space-y-4 w-full">
        <Button onClick={() => console.log('Log Out Clicked')}>Log Out</Button>
      </nav>
    </aside>
  );
}

export default AsideUserView