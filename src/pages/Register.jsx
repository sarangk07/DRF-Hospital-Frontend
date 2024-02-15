import React, { useRef } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';

function Register() {
  let nav = useNavigate();



  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confPasswordRef = useRef();
  const isDoctorRef = useRef();  // Corrected ref name

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const first_name = firstNameRef.current.value;
    // const last_name = lastNameRef.current.value;
    // const username = userNameRef.current.value;
    // const email = emailRef.current.value;
    // const password = passwordRef.current.value;
    // const conf_password = confPasswordRef.current.value;
    // const is_doctor = isDoctorRef.current.value;  

    // const data = {
    //   username: username,
    //   first_name: first_name,
    //   last_name: last_name,
    //   email: email,
    //   password: password,
    //   conf_password: conf_password,
    //   is_doctor: is_doctor,
    // };

    const fdata = new FormData();

    fdata.append('email',emailRef.current.value)
    fdata.append('username',userNameRef.current.value)
    fdata.append('first_name',firstNameRef.current.value)
    fdata.append('last_name',lastNameRef.current.value)
    fdata.append('password',passwordRef.current.value)
    // fdata.append('conf_password',confPasswordRef.current.value)
    fdata.append('is_doctor', isDoctorRef.current.checked)



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
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Create an account <br />

        <input type="text" ref={firstNameRef} placeholder='firstname' /><br />
        <input type="text" ref={lastNameRef} placeholder='lastName'/><br />
        <input type="text" ref={userNameRef} placeholder='userName'/><br />
        <input type="email" ref={emailRef} placeholder='email'/><br />
        <input type="password" ref={passwordRef} placeholder='password'/><br />
        <input type="password" ref={confPasswordRef} placeholder='confPassword'/><br />
        
        <label htmlFor="">Doctor?</label> <input type="checkbox" ref={isDoctorRef} /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
