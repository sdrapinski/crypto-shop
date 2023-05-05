import React, { useState } from "react";

import MobileMenu from "./MobileMenu";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import LoginSwitch from "./LoginSwitch";

interface HeaderProps {
  // deklarujemy propsy, których będziemy używać
}

const DashboardHeader: React.FC<HeaderProps> = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showMobileMenu, setshowMobileMenu] = useState(false);

  const options = ["Wszystko", "Książki", "Filmy"];

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setShowOptions(true);
  };
  const handleBurgerClick = () => {
    setshowMobileMenu(!showMobileMenu);
  };

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const handleFromSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/searchProduct/${searchValue}`)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <header className="main__header">
        {/* Logo */}
        <div className="header__logo">
          <NavLink to="/">
            <img src="logo.png" alt="Logo" />
          </NavLink>
        </div>
        {/* Wyszukiwarka z dropdownem */}
        <form
          className="input__wrapper"
          method="get"
          onSubmit={handleFromSubmit}
        >
          <div className="dropdown__wrapper">
            <input
              type="text"
              placeholder="Szukaj"
              value={searchValue}
              onChange={handleSearchChange}
              onBlur={() => setShowOptions(false)}
              onFocus={() => setShowOptions(true)}
            />
            {showOptions && (
              <ul className="header__autocomplete">
                {filteredOptions.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            )}
          </div>
        </form>
        {/* Ikony */}
        <div className="header__icons">
          <LoginSwitch />
        </div>
        <div className="header__burger" onClick={handleBurgerClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {showMobileMenu && <MobileMenu callback={handleBurgerClick} />}
      </header>
      <Outlet />
    </>
  );
};

export default DashboardHeader;
