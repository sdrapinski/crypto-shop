import React from "react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  callback: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = (props) => {
  return (
    <div className="mobile__menuWrapper">
      <div className="menu__closeButton" onClick={props.callback}>
        X
      </div>
      <ul className="mobileMenu__list">
        <li>
          {" "}
          <Link to="/account"> Account </Link>{" "}
        </li>
        <li>
          <Link to="/usercart">Cart</Link>
        </li>
        <li>
          <Link to="/notificationsPage">Notifications</Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
