import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import './home.css';
import axios from 'axios';

const HomePage = () => {
    const [doctors, setDoctors] = useState(null);
    const { authTokens } = useContext(AuthContext);
    const {user} = useContext(AuthContext)

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

    console.log(doctors);

    return (
        <div className='mainDIV'>
            <div className="div1"></div>
            <div className="div2">
                
                
                <h2>Available Doctors</h2>
                {doctors && doctors.map((user) => (
                    <p key={user.id}>{user.username}</p>
                ))}


            </div>
            <div className="div3">3</div>
            <div className="div4">4</div>
        </div>
    );
}

export default HomePage;
