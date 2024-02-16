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
    


<section class="vh-100 bg-image"
  style={{ backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')` }}
  >
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style={{borderRadius: "15px"}}>
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Create an account</h2>

              <form onSubmit={handleSubmit}>

                <div class="form-outline mb-4">
                  <input type="text" id="form3Example1cg" ref={firstNameRef} class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example1cg">First Name</label>
                </div>
                <div class="form-outline mb-4">
                  <input type="text" id="form3Example1cg" ref={lastNameRef} class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example1cg">Last Name</label>
                </div>
                <div class="form-outline mb-4">
                  <input type="text" id="form3Example1cg" ref={userNameRef} class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example1cg">User Name</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3cg" ref={emailRef} class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example3cg">Your Email</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cg" ref={passwordRef} class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example4cg">Password</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" ref={confPasswordRef} class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                </div>



                <label htmlFor="">Doctor?</label> <input type="checkbox" ref={isDoctorRef} /><br />



                {/* <div class="form-check d-flex justify-content-center mb-5">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label class="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                  </label>
                </div> */}

                <div class="d-flex justify-content-center">
                  <button type="submit"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p class="text-center text-muted mt-5 mb-0">Have already an account? <a onClick={()=>nav('/login')}
                    class="fw-bold text-body"><u>Login here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}

export default Register;
