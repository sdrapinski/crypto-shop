import React, { useContext, useState, useEffect, useRef } from "react";
import { FaUser, FaShoppingCart, FaBell, FaPlusSquare } from "react-icons/fa";
import { AppContext } from "../../state/AppContext";
import { NavLink } from "react-router-dom";

const LoginSwitch = () => {
  const appcontext = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [menuContent, setMenuContent] = useState("");

  const handleButtonClick = (content: string) => {
    if (content !== menuContent) {
      setMenuContent(content);
      setShowMenu(true);
    } else {
      setShowMenu(!showMenu);
    }
  };

  return (
    <>
      {appcontext?.user ? (
        <div className="header__icons">
          <div className="icon-wrapper--addProduct">
            <NavLink to="/product/addProduct">
              {" "}
              <FaPlusSquare />{" "}
            </NavLink>
          </div>
          <div className="icon-wrapper">
            <FaUser onClick={() => handleButtonClick("user")} />
          </div>

          <div className="icon-wrapper">
            <FaShoppingCart onClick={() => handleButtonClick("cart")} />
          </div>

          <div className="icon-wrapper">
            <FaBell onClick={() => handleButtonClick("notifications")} />
          </div>
          {showMenu && (
            <div className={`menu-wrapper`}>
              <div className="menu">
                {menuContent === "user" && (
                  <ul className="menu__userOptions">
                    <li>
                      <NavLink to="/account">Account Details</NavLink>
                    </li>
                    <li>
                      <button onClick={() => appcontext.logout()}>
                        Wyloguj
                      </button>
                    </li>
                  </ul>
                )}

                {menuContent === "cart" && (
                  <div>
                    <p>Products</p>{" "}
                    <NavLink to="/usercart">
                      {" "}
                      <button>Cart</button>{" "}
                    </NavLink>{" "}
                  </div>
                )}

                {menuContent === "notifications" && <p>Brak powiadomień</p>}
              </div>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login">
          <button className="button --login">Login</button>
        </NavLink>
      )}
    </>
  );
};

export default LoginSwitch;
