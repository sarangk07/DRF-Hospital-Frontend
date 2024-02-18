import React, { useContext, useState , useEffect } from 'react'
import { useRef } from 'react';
import AuthContext from '../context/AuthContext'
import axios from "axios";
import './UserPage.css'
import Header from '../components/Header';

function UserPage() {
  const {user} = useContext(AuthContext)
  const [userData,setUserData] = useState([])
  const { authTokens } = useContext(AuthContext);
  
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
//   const phoneRef = useRef();
//   const userNameRef = useRef(); 
  const phoneRef = useRef();
  

  
  const hospitalRef = useRef();
  const departmentRef = useRef();


  const handleSubmit = async (e)=>{
	
    e.preventDefault();
    const fdata = new FormData();
	

	// const hospitalValue = hospitalRef.current.value;
	const hospitalValue = hospitalRef.current ? hospitalRef.current.value : '';

  	const departmentValue = departmentRef.current ? departmentRef.current.value : '';
	

	const emailValue = emailRef.current.value;
	const firstnameValue = firstNameRef.current.value
	const lastnameValue = lastNameRef.current.value
	const phoneValue = phoneRef.current.value

	console.log('hospital:', hospitalValue);
	console.log('department:', departmentValue);

	
    fdata.append('email',emailValue)
    // fdata.append('username',userNameRef.current.value)
    fdata.append('first_name',firstnameValue)
    fdata.append('last_name',lastnameValue)
    fdata.append('phone',phoneValue)


	// console.log(phoneRef,"phone--------------------------------------");

	if(userData.doctor_pro){
		fdata.append('doctor_pro.department',departmentValue)
		fdata.append('doctor_pro.hospital',hospitalValue)
	}

	

	


	// console.log("user dataaaaaaaaaaaaaaaaa[userData]",userData)
	// console.log('email',emailRef.current.value)
	// console.log('username',userNameRef.current.value)
	// console.log('first_name',firstNameRef.current.value)
	// console.log('last_name',lastNameRef.current.value)
	// console.log('phone',phoneRef.current.value)
    // console.log('updateeeeeeeeeeeeeeeee',fdata)


    try {
      const response = await axios.patch('http://127.0.0.1:8000/api/profile/', fdata, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + String(authTokens?.access),
        },
      });
      console.log("Responseeeeeeeeeeeeeeeeeeeeeeeeee================",response)
      if (response.status === 201) {
		console.log('profile updated!.');
        alert('profile updated');
      }else if(response.status === 200){
		console.log('profile updated[c].');
        alert('profile created')
      }
      else if(response.status === 401){
        alert('unauthorized!')
      }else if(response.status === 403){
        alert('Forbidden!')
      } else {
        console.log(JSON.stringify(response.data));
        alert('Something went wrong! Please try again.\nError: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error during registration:', error); 
      console.error('Error response data:', error.response.data);
      alert('Error:\n' + JSON.stringify(error.response.data, null, 6));
    }






  }



  // console.log('user profile userrrrrr..................',user);
  // console.log('user profile Token..................',authTokens);


  const getProfile = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
        headers: {
          "Content-Type": "application/json",
           Authorization: "Bearer " + String(authTokens.access),
        },
      });
  
      if (response.status === 200) {
        const data = response.data.data;
        setUserData(data);
      }
  
      console.log('user data responseeeeee', response);
      console.log('user staus', response.status);
      console.log('user data', response.data);
    } catch (error) {
      console.error("error while fetching user data", error);
    }
  };
  console.log('hi',userData);
//   console.log(userData);
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
    

{userData.doctor_pro == null ? <> 

{/* userpage */}
<Header/>
<div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="account-settings">
			<div class="user-profile">
				<div class="user-avatar">
					<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin"/>
				</div>
				<h5 class="user-name">{userData.username}</h5>
				<h6 class="user-email">{userData.email}</h6>
			</div>
		</div>
	</div>
</div>
</div>
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mb-2 text-primary">Personal Details</h6>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="fullName">First Name</label> : <span>{userData.first_name}</span>
				</div>
			</div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="fullName">Last Name</label> : <span>{userData.last_name}</span>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="eMail">Email</label> : <span>{userData.email}</span>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="phone">Phone</label> : <span>{userData.phone}</span>
				</div>
			</div>
	
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mt-3 mb-2 text-primary">Edit </h6>
			</div>





      <form action="" onSubmit={handleSubmit}>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="ciTy">First Name</label>
					<input type="name" class="form-control" id="ciTy" defaultValue={userData.first_name}  ref={firstNameRef}/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="sTate">Last Name</label>
					<input type="text" class="form-control" id="sTate" defaultValue={userData.last_name}  ref={lastNameRef} />
				</div>
			</div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="sTate">Email</label>
					<input type="text" class="form-control" id="sTate" defaultValue={userData.email}  ref={emailRef}/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="zIp">Phone</label>
					<input type="number" class="form-control" id="zIp" defaultValue={userData.phone}  ref={phoneRef}/>
				</div>
			</div><br />
      <button type="submit" id="submit" name="submit" class="btn btn-primary">Update</button>
      </form>
		</div>
	</div>
</div>
</div>
</div>
</div> </>


:


// doctor page.....


<> 
<Header/>
<div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="account-settings">
			<div class="user-profile">
				<div class="user-avatar">
					<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin"/>
				</div>
				<h5 class="user-name">{userData.username}</h5>
				<h6 class="user-email">{userData.email}</h6>
			</div>
		</div>
	</div>
</div>
</div>
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mb-2 text-primary">Personal Details</h6>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="fullName">First Name</label> : <span>{userData.first_name}</span>
				</div>
			</div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="fullName">Last Name</label> : <span>{userData.last_name}</span>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="eMail">Email</label> : <span>{userData.email}</span>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="phone">Phone</label> : <span>{userData.phone}</span>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="phone">Hospital</label> : <span>{userData.doctor_pro.hospital}</span>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="phone">Department</label> : <span>{userData.doctor_pro.department}</span>
				</div>
			</div>
	
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mt-3 mb-2 text-primary">Edit </h6>
			</div>





      <form action="" onSubmit={handleSubmit}>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				{/* <div class="form-group">
					<label for="Street">UserName</label>
					<input defaultValue={userData.username}  ref={userNameRef} type="name" class="form-control" id="Street" />
				</div> */}
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="ciTy">First Name</label>
					<input type="name" class="form-control" id="ciTy" defaultValue={userData.first_name}  ref={firstNameRef}/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="sTate">Last Name</label>
					<input type="text" class="form-control" id="sTate" defaultValue={userData.last_name}  ref={lastNameRef} />
				</div>
			</div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="sTate">Email</label>
					<input type="text" class="form-control" id="sTate" defaultValue={userData.email}  ref={emailRef}/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="zIp">Phone</label>
					<input type="number" class="form-control" id="zIp" defaultValue={userData.phone}  ref={phoneRef}/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="sTate">Hospital</label>
					<input type="text" class="form-control" id="sTate" defaultValue={userData.doctor_pro.hospital}  ref={hospitalRef}/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="sTate">Department</label>
					<input type="text" class="form-control" id="sTate" defaultValue={userData.doctor_pro.department}  ref={departmentRef}/>
				</div>
			</div>
			<br />
      <button type="submit" id="submit" name="submit" class="btn btn-primary">Update</button>
      </form>
		</div>
	</div>
</div>
</div>
</div>
</div> </>}


    </>
  )
}

export default UserPage
