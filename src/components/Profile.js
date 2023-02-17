import React from 'react'

const Profile = () => {
    let auth = localStorage.getItem('user')
   auth =   JSON.parse(auth)
    console.log(auth)
  return (
    <div>
        {
            <h1> hello  user {  auth.data.name } welcome to home page </h1>
        }
    </div>
  )
}

export default Profile