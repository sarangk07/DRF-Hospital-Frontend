import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";
import Modal from "./Modals";

function Admin() {
  const [users, setUsers] = useState([]);
  const [blockuser, setBlockUser] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const { authTokens } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const [isModalOpen, setIsModalOpen] = useState(false);



  console.log(users, "userrrrrrrrrrrrrrrrrrrrrrrrrr");

  const encodedTokens = localStorage.getItem("authTokens"); // Get the JSON string
  const tokens = JSON.parse(encodedTokens); // Parse the JSON string
  const accessToken = tokens.access;



  const fetchUserList = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.get("http://127.0.0.1:8000/api/userlist/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(accessToken),
        },
      });

      if (response.status === 200) {
        const data = await response.data;

        const currentBlockedUser = data.reduce((acc, user) => {
          acc[user.pk] =
            localStorage.getItem(`blockUser_${user.pk}`) == "true" || false;
          return acc;
        }, {});
        setBlockUser(currentBlockedUser);
        setUsers(data);

        // console.log(users, "userrrrrrrrrrrrrrrrrrrrrrrrrr");
      } else if (response.status === 401) {
        console.error("Unauthorized access. Check authentication tokens.");
      } else {
        console.error("Error fetching users. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };



  const handleBlockUnblock = async (pk, isBlocked) => {
    try {
      if (!pk) {
        console.error("User ID is undefined.");
        return;
      }
  
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/userlist/${pk}/`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(accessToken),
          },
        }
      );
  
      if (response.status === 200) {
        // Update the state to reflect the changes
        if (isBlocked) {
          alert("User blocked");
        } else {
          alert("User unblocked");
        }
  
        setBlockUser((prevBlockUser) => ({
          ...prevBlockUser,
          [pk]: isBlocked,
        }));
        localStorage.setItem(`blockUser_${pk}`, String(isBlocked));
      } else {
        console.error("Error updating user status. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };



  const handleViewDetails = (user) => {
    // Set the selected user details in the state
    setSelectedUser(user);
    // Display details using alert or any other method
    // alert(`User Details:\nUsername: ${user.username}\nEmail: ${user.email}${
    //   user.is_doctor && user.doctor ? `\nHospital: ${user.doctor.hospital}\nDepartment: ${user.doctor.department}` : ''
    // }`);
    
    // Open the modal
    setIsModalOpen(true);
    
    
  };

  const closeModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
 
<>
  <Header />
  <div className="container mt-3">
    <div className="row">
      <div className="col-md-6">
        {isLoading && <p>Loading users...</p>}
        <div>
          <h2 className=" bg-gradient">User List</h2>
          <Modal isOpen={isModalOpen} onClose={closeModal} userDetails={selectedUser} />
          {users &&
            users.map((user) => (
              <div key={user.id}>
                {!user.is_admin && !user.is_doctor ? (
                  <p>
                    <p className="text-muted">{user.username}</p>
                    <a
                      className={`btn btn-primary ${blockuser[user.pk] ? "btn-danger" : "btn-success"}`}
                      href="#"
                      onClick={() => handleBlockUnblock(user.pk, !blockuser[user.pk])}
                    >
                      {blockuser[user.pk] ? "Unblock" : "Block"}
                    </a>
                    <button className="btn btn-info" onClick={() => handleViewDetails(user)}>
                      View Details
                    </button>
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="col-md-6">
        <h2>Doctor List</h2>
        {users &&
          users.map((doctor) => (
            <div key={doctor.id}>
              {!doctor.is_admin && doctor.is_doctor ? (
                <p>
                  <p>{doctor.username}</p>
                  <a
                    href="#"
                    className={`btn btn-primary ${blockuser[doctor.pk] ? "btn-danger" : "btn-success"}`}
                    onClick={() => handleBlockUnblock(doctor.pk, !blockuser[doctor.pk])}
                  >
                    {blockuser[doctor.pk] ? "Unblock" : "Block"}
                  </a>
                  <button className="btn btn-info" onClick={() => handleViewDetails(doctor)}>
                    View Details
                  </button>
                </p>
              ) : (
                <p></p>
              )}
            </div>
          ))}
      </div>
    </div>
  </div>
</>

  );
}

export default Admin;
