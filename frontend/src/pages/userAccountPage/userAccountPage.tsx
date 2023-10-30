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

    for(const button of buttonsArray){
      button.addEventListener("click",()=>{
        changeActiveBtn(button, buttonsArray)
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
              <button className="nav-link" id="settings-tab" data-bs-target="#settings-content" type="button">Settings</button>
              <button className="nav-link" id="userCart-tab" data-bs-target="#userCart-content" type="button">Your Cart</button>
            </div>
          </div>
        </div>

        <div className="col-9">
          <div className="tab-content">
            <div className="tab-pane fade show active" id="profile-content">
              <ol className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Name</div>
                    Content for list item
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Surname</div>
                    Content for list item
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Email</div>
                    Content for list item
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Login</div>
                    Content for list item
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Password</div>
                    Content for list item
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Phone</div>
                    Content for list item
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Birthday</div>
                    Content for list item
                  </div>
                </li>
              </ol>
            </div>
            <div className="tab-pane fade" id="settings-content">Settings</div>
            <div className="tab-pane fade" id="userCart-content">Cart</div>
          </div>
        </div>
      </div>
      {/* <NavLink to="userProducts">Your Products </NavLink> */}
    </div>
  );
};

export default UserAccountPage;
