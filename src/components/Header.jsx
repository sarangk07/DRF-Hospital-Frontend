import React ,{useContext}from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Header = () => {
    let {user,logoutUser} = useContext(AuthContext)
  return (
    <div style={{backgroundColor:'white'}}>
      <Link to='/home' >Home</Link>
         <span>  |  </span>
      {user?(<a onClick={logoutUser}>Logout</a>):(<Link to='/login' >Login</Link>)}
      
      {user && <h3>welcome {user.username}</h3>}
      
    </div>
  )
}

export default Header
