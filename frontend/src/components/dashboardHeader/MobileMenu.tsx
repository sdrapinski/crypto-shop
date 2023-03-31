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
          <Link to="/"> Account </Link>{" "}
        </li>
        <li>
          <Link to="/">Cart</Link>
        </li>
        <li>
          <Link to="/">Notifications</Link>
        </li>
        <li>
          <Link to="/">Categories</Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
