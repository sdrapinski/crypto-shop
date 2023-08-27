import React from "react";
import { NavLink } from "react-router-dom";

const UserAccountPage = () => {
  return (
    <div>
      UserAccountPage <br />
      <NavLink to="userProducts">Your Products </NavLink>
    </div>
  );
};

export default UserAccountPage;
