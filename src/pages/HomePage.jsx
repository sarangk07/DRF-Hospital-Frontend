import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import './home.css';
import axios from 'axios';
import Header from "../components/Header";

const HomePage = () => {
    const [doctors, setDoctors] = useState(null);
    const { authTokens } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    const UsersList = async () => {
        console.log(authTokens)
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/doctorlist/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': String(authTokens?.access),
                }
            });

            if (response.status === 200) {
                const data = await response.data;
                setDoctors(data);
            } else {
                console.error("Error fetching users. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    useEffect(() => {
        if (doctors === null || doctors === undefined) {
            UsersList();
        }
    }, [doctors, authTokens?.access]);

    console.log('doc',doctors);

    return (
        
        <div className='mainDIV'>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="divUserHomepage"></div>
          </div>
        </div>
      </div>
      <div className="div3 container">
      <div className="row">
          <div className="col-md-12">
            <h2 style={{fontFamily:'initial'}}>Available Doctors</h2>
            <div className="row">
              {doctors && doctors.map((doctor) => (
                <div className="col-lg-4 col-md-6 mb-4" key={doctor.id}>
                  <div className="card text-center">
                    <div className="card-header">
                      {doctor.first_name}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Department</h5><p style={{color:"green"}}>{doctor.doctor.department}</p>
                      <p className="card-text">Hospital: {doctor.doctor.hospital}</p>
                      <p className="card-text"></p>
                      <a href="#" className="btn btn-primary"  >Contact</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="div4 container-fluid">
      <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>Contact Us</h4><br />
            <p>
              <strong>Address:</strong> 123 Medical Street, Kannur, Kerala, India
            </p>
            <p>
              <strong>Phone:</strong> +91 9988-999-666
            </p>
            <p>
              <strong>Emergency:</strong> 102
            </p>
            <p>
              <strong>Email:</strong> cle@hospital.com
            </p>
          </div>
          <div className="col-md-4">
            <h4>CLE-Hospital</h4><br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus quis rhoncus sapien, eu congue neque.
            </p>
          </div>
          <div className="col-md-4">
            <h4>Quick Links</h4><br />
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Doctors</a></li>
              <li><a href="#">Appointments</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12 text-center">
            <p>&copy; 2024 CLE-Hospital. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
    );
}

export default HomePage;
