import React from 'react'
import { useEffect,useState  } from 'react';
import './Doctor.css'
import axios from 'axios'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function DoctorPage() {

  const { user, logoutUser, authTokens, setDoctors } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const ProfileUpdate = async () => {
    try {
      const response = await axios.patch(
        'http://127.0.0.1:8000/api/profile/',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        // Do something with data if needed
      } else {
        console.error('Error updating profile. Status:', response.status);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const profileGet = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/doctorlist/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setUserData(data); // Update the state with user data obtained from the API
      } else {
        console.error('Error fetching doctor list. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching doctor list:', error);
    }
  };

  useEffect(() => {
    // Call the functions when the component mounts
    ProfileUpdate();
    profileGet();
  }, []); // Empty dependency array means it will only run once when mounted


  return (
<div>
<section className="h-100 gradient-custom-2">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-lg-9 col-xl-7">
          <div className="card">
            <div className="rounded-top text-white d-flex flex-row d1">
              <div className="ms-4 mt-5 d-flex flex-column d2" >
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                  alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2 d3"
                   />
                <button type="button" className="btn btn-outline-dark d4" data-mdb-ripple-color="dark"
                  >
                    Edit profile
                </button>
                {userData && (
        <>
          <div className="ms-3 d5">
            <h5>{userData.username}</h5>
            <p>{userData.first_name}</p>
            <p>{userData.last_name}</p>
            <p>{userData.email}</p>
          </div>
        </>
      )}

                </div>
              {/* Your existing JSX */}
      
                    
                  
              
              
            </div>
            <div className="p-4 text-black d6" >
              <div className="d-flex justify-content-end text-center py-1">
                <div>
                  <p className="mb-1 h5">253</p>
                  <p className="small text-muted mb-0">Photos</p>
                </div>
                <div className="px-3">
                  <p className="mb-1 h5">1026</p>
                  <p className="small text-muted mb-0">Followers</p>
                </div>
                <div>
                  <p className="mb-1 h5">478</p>
                  <p className="small text-muted mb-0">Following</p>
                </div>
              </div>
            </div>
          <div class="card-body p-4 text-black">
            <div class="mb-5">
              <p class="lead fw-normal mb-1">About</p>
              <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                <p class="font-italic mb-1">Web Developer</p>
                <p class="font-italic mb-1">Lives in New York</p>
                <p class="font-italic mb-0">Photographer</p>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <p class="lead fw-normal mb-0">Recent photos</p>
              <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p>
            </div>
            <div class="row g-2">
              <div class="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                  alt="image 1" class="w-100 rounded-3"/>
              </div>
              <div class="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                  alt="image 1" class="w-100 rounded-3"/>
              </div>
            </div>
            <div class="row g-2">
              <div class="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                  alt="image 1" class="w-100 rounded-3"/>
              </div>
              <div class="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                  alt="image 1" class="w-100 rounded-3"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default DoctorPage
