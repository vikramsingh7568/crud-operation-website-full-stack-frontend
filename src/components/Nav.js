import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../components/nav.css'


const Nav = () => {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate();
  // we are clearing local storrage so user can log out 
  const logout =()=>{
    localStorage.clear();
    navigate('/signup')
  }
  return (
    <div>
      <img alt="logo"
      className='logo' 
      src="https://cdn.3dnames.co/previews/ps26/500x500/v/ps26vikram_singh3dxx.webp"></img>
      {
        auth ? 
      
        <ul className='nav-ul'>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Products</Link></li>
            <li><Link to="/update/:id">Update Products</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li> <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).data.name})</Link> </li>
         </ul>
          :
          <ul className='nav-ul nav-right'>
             <li> <Link to="/signup">Sign Up</Link> </li>
             <li> <Link to="/login">Login</Link></li> 
          </ul>
      }  
  
    </div>
  )
}

export default Nav