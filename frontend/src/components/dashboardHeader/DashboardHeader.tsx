import React, { useEffect, useState, useContext } from "react";

import MobileMenu from "./MobileMenu";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import LoginSwitch from "./LoginSwitch";
import { AppContext } from "../../state/AppContext";

interface HeaderProps {
  // deklarujemy propsy, których będziemy używać
}

const DashboardHeader: React.FC<HeaderProps> = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showMobileMenu, setshowMobileMenu] = useState(false);
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const options = ["Wszystko", "Książki", "Filmy"];
  const backendUrl = appContext?.backendUrl

  useEffect(() => {
    async function checkToken() {
      await appContext?.checkAccessToken();
    }
    checkToken();
  }, []);

  useEffect(() => {
    const user_id = appContext?.user?.user_id;
    async function getCart() {
      await appContext?.getCart(user_id!);
    }
    if (appContext?.user) {
      getCart();
    }
  }, [appContext?.user]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (event.target.value.length > 2) {
      axios
        .get(
          `${backendUrl}/offer/searchProduct/${event.target.value}`
        )
        .then((response) => {
          
        });
      setShowOptions(true);
    }
  };
  const handleBurgerClick = () => {
    setshowMobileMenu(!showMobileMenu);
  };

  const handleFromSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(searchValue && searchValue.length >0){
      navigate(`products/search/${searchValue}`);
      }
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
