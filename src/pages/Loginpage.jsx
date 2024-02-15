import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import './login.css'
import { useNavigate } from 'react-router-dom'




const Loginpage = () => {
    let nav = useNavigate()
    let {loginUser} = useContext(AuthContext)
  return (
    // <div>
    //   <form action="" onSubmit={loginUser}>
    //     <input type="text" name="username" placeholder='Username'/>
    //     <br />
    //     <input type="password" name='password' placeholder='password' />
    //     <br /><input type="submit" />
    //   </form>

    // </div>



    <div className="container" >
      <div className="screen">
        <div className="screen__content mainDiv">
          <form className="login loginF" onSubmit={loginUser}>
            <div className="login__field usernameF">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" name="username" placeholder="User name" />
            </div>
            <div className="login__field passwordF">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" name='password' placeholder="Password"/>
            </div>
            <div className="submitB">
            <button className="button login__submit ">
              <span className="button__text" type="submit">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            
            </div>				
          </form>
          <a className="button__text" type="submit" onClick={()=>nav('/register')}>create an account?</a>
        </div>
        		
      </div>
    </div>
  )
}

export default Loginpage
