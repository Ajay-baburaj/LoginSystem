import React from 'react'
import { useContext } from 'react'

function Profile() {
  
  return (
    <>
    <div className='profile-container' style={{display:"flex"}}>
      <div className='text-container'>
          <h4>username</h4>
          <h4>userEmail</h4>
        </div>
      <div className='image-container'>
          <img src="" alt="profile-pic" />
      </div>
    </div>
    </>
    
  )
}

export default Profile