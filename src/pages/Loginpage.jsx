import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import './login.css'




const Loginpage = () => {
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



    <div class="container" >
      <div class="screen">
        <div class="screen__content mainDiv">
          <form class="login loginF" onSubmit={loginUser}>
            <div class="login__field usernameF">
              <i class="login__icon fas fa-user"></i>
              <input type="text" class="login__input" name="username" placeholder="User name" />
            </div>
            <div class="login__field passwordF">
              <i class="login__icon fas fa-lock"></i>
              <input type="password" class="login__input" name='password' placeholder="Password"/>
            </div>
            <div class="submitB">
            <button class="button login__submit ">
              <span class="button__text" type="submit">Log In Now</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
            </div>				
          </form>
      
        </div>
        		
      </div>
    </div>
  )
}

export default Loginpage
