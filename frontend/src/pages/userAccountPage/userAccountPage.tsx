import { NULL } from "node-sass";
import React, { Component, useEffect } from "react";
import { NavLink } from "react-router-dom";

const UserAccountPage = () => {
  // UserAccountPage
  useEffect(()=>{
    const buttons = document.getElementById("tablist")?.getElementsByTagName("button")
    const buttonsArray = buttons ? Array.from(buttons) : []

    if(!buttonsArray){
      return
    }

    function changeActiveBtn(currentButton: HTMLButtonElement, buttons: HTMLButtonElement[]){
      for(const button of buttons){
        button.classList.remove("active")
        const target = button.getAttribute("data-bs-target")
        if(!target){
          continue;
        }
        const content = document.querySelector(target)
        content?.classList.remove("active")
        content?.classList.remove("show")
      }
      const target = currentButton.getAttribute("data-bs-target")
      if(!target){
        return
      }

      const content = document.querySelector(target)
      content?.classList.add("show")
      content?.classList.add("active")

      currentButton.classList.add("active")
    }

    function setOneSizeForButtons(target: string){
      const targetContent = document.getElementById(target)

      if(!targetContent){
        return
      }

      const buttons = targetContent.querySelectorAll("button")

      if(!buttons){
        return
      }

      let width = 0

      buttons.forEach((button)=>{
        width = button.offsetWidth > width ? button.offsetWidth : width
      })

      const widthStyle = width + "px"

      buttons.forEach((button)=>{
        button.style.width = widthStyle
      })
    }

    for(const button of buttonsArray){
      button.addEventListener("click",()=>{
        changeActiveBtn(button, buttonsArray)
        if(button.getAttribute("data-bs-target") === "#settings-content"){
          setOneSizeForButtons("settings-content")
        }
      })
    }
  },[])
  return (
    <div>
      <div className="row p-4">
        <div className="col-3">
          <div className="d-flex align-items-center">
            <div className="nav flex-column nav-pills me-3 w-100" id="tablist" aria-orientation="vertical">
              <button className="nav-link active" id="profile-tab" data-bs-target="#profile-content" type="button">Profile</button>
              <button className="nav-link" id="userWallets-tab" data-bs-target="#userWallets-content" type="button">Wallets</button>
              <button className="nav-link" id="userProduct-tab" data-bs-target="#userProduct-content" type="button">Your Products</button>
              <button className="nav-link" id="userCart-tab" data-bs-target="#userCart-content" type="button">Your Cart</button>
              <button className="nav-link" id="userOrderHistory-tab" data-bs-target="#userOrderHistory-content" type="button">History of Orders</button>
              <button className="nav-link" id="settings-tab" data-bs-target="#settings-content" type="button">Settings</button>
              
            </div>
          </div>
        </div>

        <div className="col-9">
          <div className="tab-content">
            <div className="tab-pane fade show active" id="profile-content">
              <ol className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Tokens Quantity</div>
                    Quantity
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Active Wallet</div>
                    Wallet
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Name</div>
                    Name
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Surname</div>
                    Surname
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Email</div>
                    Email
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Login</div>
                    Login
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Password</div>
                    Password
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Phone</div>
                    Phone
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Birthday</div>
                    Birthday
                  </div>
                </li>
              </ol>
            </div>
            <div className="tab-pane fade" id="settings-content">
              <div className="row mb-4">
                <div className="col-4">
                  Switch Darkmode
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch"/>
                  </div>
                </div>
              </div>
              {/* <div className="row my-1">
                <div className="col-4">
                  History of orders
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <button type="button" className="btn btn-custom btn-sm">Check</button>
                </div>
              </div> */}
              <div className="row my-1">
                <div className="col-4">
                  Edit data
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <button type="button" className="btn btn-custom btn-sm">Edit</button>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="userCart-content">Cart</div>
            <div className="tab-pane fade" id="userProduct-content">Products</div>
            <div className="tab-pane fade" id="userWallets-content">Wallets</div>
            <div className="tab-pane fade" id="userOrderHistory-content">History of Orders</div>
          </div>
        </div>
      </div>
      {/* <NavLink to="userProducts">Your Products </NavLink> */}
    </div>
  );
};

export default UserAccountPage;
