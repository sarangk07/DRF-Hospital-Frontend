import React, { useRef } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import './Register.css'

function Register() {
  let nav = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confPasswordRef = useRef();
  const isDoctorRef = useRef();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fdata = new FormData();

    fdata.append('email',emailRef.current.value)
    fdata.append('username',userNameRef.current.value)
    fdata.append('first_name',firstNameRef.current.value)
    fdata.append('last_name',lastNameRef.current.value)
    fdata.append('password',passwordRef.current.value)
    fdata.append('confirm_password',confPasswordRef.current.value)
    fdata.append('is_doctor', isDoctorRef.current.checked)


    if (passwordRef.current.value !== confPasswordRef.current.value) {
      alert('Passwords do not match');
      return;
    }
    console.log(fdata)


    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', fdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.status === 201) {
        alert('Registration complete, please login.');
        nav('/login')
      }
      else if(response.status === 401){
        alert('unauthorized!')
      }else if(response.status === 403){
        alert('Forbidden!')
      } else {
        alert('Something went wrong! Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error); 
      console.error('Error response data:', error.response.data);
      alert('Error:\n' + JSON.stringify(error.response.data, null, 6));
    }
  }

  return (
    <>
    

    <div class="container">
  <div class="row">
    <div class="col-lg-10 col-xl-9 mx-auto">
      <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
        <div class="card-img-left d-none d-md-flex">
          {/* Background image for card set in CSS! */}
        </div>
        <div class="card-body p-4 p-sm-5">
          <h5 class="card-title text-center mb-5 fw-light fs-5">Create an account</h5>
          <form onSubmit={handleSubmit}>

            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingFirstName" ref={firstNameRef} />
              <label for="floatingFirstName">First Name</label>
            </div>

            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingLastName" ref={lastNameRef} />
              <label for="floatingLastName">Last Name</label>
            </div>

            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingInputUsername" ref={userNameRef} required autofocus />
              <label for="floatingInputUsername">Username</label>
            </div>

            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInputEmail" ref={emailRef} />
              <label for="floatingInputEmail">Email address</label>
            </div>

            <div class="form-floating mb-3">
              <input type="password" class="form-control" id="floatingPassword" ref={passwordRef} />
              <label for="floatingPassword">Password</label>
            </div>

            <div class="form-floating mb-3">
              <input type="password" class="form-control" id="floatingPasswordConfirm" ref={confPasswordRef} />
              <label for="floatingPasswordConfirm">Confirm Password</label>
            </div>

            <div class="form-check mb-3">
              <input type="checkbox" class="form-check-input" id="isDoctor" ref={isDoctorRef} />
              <label class="form-check-label" for="isDoctor">Doctor?</label>
            </div>

            <div class="d-grid mb-2">
              <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Register</button>
            </div>

            <p class="text-center small mt-2"><a href="#" onClick={() => nav('/login')}>Have an account? Sign In</a></p>

            <hr class="my-4"/>

            <div class="d-grid mb-2">
              <button class="btn btn-lg btn-google btn-login fw-bold text-uppercase" type="button">
                <i class="fab fa-google me-2"></i> Sign up with Google
              </button>
            </div>

            <div class="d-grid">
              <button class="btn btn-lg btn-facebook btn-login fw-bold text-uppercase" type="button">
                <i class="fab fa-facebook-f me-2"></i> Sign up with Facebook
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  );
}

export default Register;
