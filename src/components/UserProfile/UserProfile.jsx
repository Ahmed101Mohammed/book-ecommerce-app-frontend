import React from 'react';
import { useSelector } from 'react-redux';
import AsideUserView from './AsideUserView.jsx';
import Dashboard from './Dashboard.jsx'

const UserProfileContent = ()=>
{
  const user = useSelector(state => state.user)
  if(!user) return
  if(user.userData.role === 'user') return <p className='text-gray-600 text-center'>No thing to present</p>
  if(user.userData.role === 'admin') return <Dashboard/>
}

const UserProfile = () => 
{
  const user = useSelector(state => state.user)
  if(!user) return

  const style = {
    paddingLeft: '276px',
    paddingTop: '84px',
    paddingRight: '20px',
    paddinngBottom: '20px'
  }
  return (
    <main className='bg-teal-50 min-h-full' style={style}>
      <AsideUserView/>
      <UserProfileContent/>
    </main>
  );
};

export default UserProfile;
