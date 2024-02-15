import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

// const unblockUser = (users, userId) => {
//   console.log("unblock clicked", userId);
//   // Update the state to unblock the user
//   const updatedUsers = users.map(user => (user.id === userId ? { ...user, is_block: false } : user));
//   return updatedUsers;
// };

// const blockUser = (users, userId) => {
//   console.log("block clicked", userId);
//   // Update the state to block the user
//   const updatedUsers = users.map(user => (user.id === userId ? { ...user, is_block: true } : user));
//   return updatedUsers;
// };

function Admin() {
  const [users, setUsers] = useState([]);
  const [blockuser, setBlockUser] = useState({});
  const { authTokens } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // Uncomment console logs for debugging (when expected)
  console.log(users, "userrrrrrrrrrrrrrrrrrrrrrrrrr");

  const encodedTokens = localStorage.getItem("authTokens"); // Get the JSON string
  const tokens = JSON.parse(encodedTokens); // Parse the JSON string
  const accessToken = tokens.access;

  // const handleBlock = (userId) => {
  //   blockUser(userId);
  // };

  // const handleUnblock = (userId) => {
  //   unblockUser(userId);
  // };

  // console.log("*------------------------------------------------------*",accesss);
  // console.log(res, "responseeeeeeeeeeeeeeeeeee");

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

  const handleBlock = async (pk) => {
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
        alert("user blocked");
        setBlockUser((preBlokuser) => ({
          ...preBlokuser,
          [pk]: true,
        }));
        localStorage.setItem(`blockUser_${pk}`, "true");
      } else {
        console.error("Error updating user status. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleUnBlock = async (pk) => {
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
        alert("user Unblocked");
        setBlockUser((preBlokuser) => ({
          ...preBlokuser,
          [pk]: false,
        }));
        localStorage.setItem(`blockUser_${pk}`, "false");
      } else {
        console.error("Error updating user status. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
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

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
    >
      <div>
        {isLoading && <p>Loading users...</p>}

        <div>
          <h2>User List</h2>
          {users &&
            users.map((user) => (
              <div key={user.id}>
                {!user.is_admin && !user.is_doctor ? (
                  <p>
                    {blockuser[user.pk] ? (
                      <>
                        {" "}
                        <p>{user.username}</p>
                        <a href="#" onClick={() => handleUnBlock(user.pk)}>
                          unblock
                        </a>{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <p>{user.username}</p>
                        <a href="#" onClick={() => handleBlock(user.pk)}>
                          block
                        </a>{" "}
                      </>
                    )}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            ))}
        </div>
      </div>

      <div>
        <h2>Doctor List</h2>
        {users &&
          users.map((doctor) => (
            <div key={doctor.id}>
              {!doctor.is_admin && doctor.is_doctor ? (
                <p>
                  {blockuser[doctor.pk] ? (
                    <>
                      {" "}
                      <p>{doctor.username}</p>
                      <a href="#" onClick={() => handleUnBlock(doctor.pk)}>
                        unblock
                      </a>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <p>{doctor.username}</p>
                      <a href="#" onClick={() => handleBlock(doctor.pk)}>
                        block
                      </a>{" "}
                    </>
                  )}
                </p>
              ) : (
                <p></p>
              )}
            </div>
          ))}
      </div>
    </div>




  //   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
  //   <div>
  //     {isLoading && <p>Loading users...</p>}

  //     <div>
  //       <h2>User List</h2>
  //       {users &&
  //         users.map((user) => (
  //           <div key={user.id}>
  //             {!user.is_admin && !user.is_doctor ? (
  //               <p>
  //                 <p>{user.username}</p>
  //                 <a href="#" onClick={() => handleBlockUnblock(user.pk, !blockuser[user.pk])}>
  //                   {blockuser[user.pk] ? "Unblock" : "Block"}
  //                 </a>
  //               </p>
  //             ) : (
  //               <p></p>
  //             )}
  //           </div>
  //         ))}
  //     </div>
  //   </div>

  //   <div>
  //     <h2>Doctor List</h2>
  //     {users &&
  //       users.map((doctor) => (
  //         <div key={doctor.id}>
  //           {!doctor.is_admin && doctor.is_doctor ? (
  //             <p>
  //               <p>{doctor.username}</p>
  //               <a href="#" onClick={() => handleBlockUnblock(doctor.pk, !blockuser[doctor.pk])}>
  //                 {blockuser[doctor.pk] ? "Unblock" : "Block"}
  //               </a>
  //             </p>
  //           ) : (
  //             <p></p>
  //           )}
  //         </div>
  //       ))}
  //   </div>
  // </div>
  );
}

export default Admin;
