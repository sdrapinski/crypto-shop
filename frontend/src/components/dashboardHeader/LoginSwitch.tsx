import React, { useContext } from "react";
import { FaUser, FaShoppingCart, FaBell } from "react-icons/fa";
import { AppContext } from "../../state/AppContext";
import { NavLink } from "react-router-dom";
const LoginSwitch = () => {
  const appcontext = useContext(AppContext);
  return (
    <>
      {appcontext?.user.isLoggedIn ? (
        <>
          {" "}
          <NavLink to="userdetails">
            {" "}
            <FaUser />{" "}
          </NavLink>
          <NavLink to="usercart">
            {" "}
            <FaShoppingCart />{" "}
          </NavLink>
          <FaBell />{" "}
        </>
      ) : (
        <NavLink to="/login">
          <button className="button --login">Login</button>
        </NavLink>
      )}
    </>
  );
};

export default LoginSwitch;
