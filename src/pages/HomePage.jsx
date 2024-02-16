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
            <Header/>
            <div className="div2">
                        <div className="divUserHomepage"></div>
                        <h2>Available Doctors</h2>
                        <div className="container">
                            <div className="row div2">
                                {doctors && doctors.map((doctor) => (
                                    <div className="col-lg-4 col-md-6 mb-4" key={doctor.id}>
                                        <div className="card text-center">
                                            <div className="card-header">
                                                {doctor.username}
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">Department: {doctor.doctor.department}</h5>
                                                <p className="card-text">Hospital: {doctor.doctor.hospital}</p>
                                                <a href="#" className="btn btn-primary">more...</a>
                                            </div>
                                            {/* <div className="card-footer text-muted">2 days ago</div> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
            </div>
            <div className="div3">3</div>
            <div className="div4">4</div>
        </div>
    );
}

export default HomePage;
