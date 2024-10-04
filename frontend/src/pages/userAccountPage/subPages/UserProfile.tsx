import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../state/AppContext";
import axios from "axios";
import {UserData} from "../../../interfaces/Profile.interface";

const UserProfile = () => {

  const appContext = useContext(AppContext);
  const userId = appContext?.user?.user_id;

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if(userId !== undefined){
      axios
          .get<UserData>(
              `${appContext?.backendUrl}/user/getUserData/${userId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
          )
          .then((response)=>{
            setUser(response.data);
          });
    }
  },[userId]);

  return (
    <div className="tab-pane fade show active" id="profile-content">
      <ol className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Name</div>
            {user?.user_name}
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Surname</div>
            {user?.user_surname}
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Email</div>
            {user?.user_email}
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Login</div>
            {user?.user_login}
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Phone</div>
            {user?.user_phone_number}
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Birthday</div>
            {user?.user_date_of_birth}
          </div>
        </li>
      </ol>
    </div>
  );
};

export default UserProfile;
