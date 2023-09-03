import React, { useContext, useEffect } from "react";
import { AppContext } from "../../state/AppContext";

const UserDetails = () => {
  const appcontext = useContext(AppContext);

  return  (
    <div className="container my-3">
      <div className="card">
        <div className="card-body border border-0 productCardBorder">
          <div className="row">
            <div className="col-12">
              <h4>Your account details {appcontext?.user?.user_name} {appcontext?.user?.user_surname}</h4>
            </div>
            <div className="border border-bottom my-2"></div>
            <div className="col-12 mb-1">
              <span><strong>Region:</strong> {appcontext?.user?.continent}</span>
            </div>
            <div className="col-12 my-1">
              <span><strong>Country:</strong> {appcontext?.user?.country}</span>
            </div>
            <div className="col-12 my-1">
              <span><strong>City:</strong> {appcontext?.user?.city}</span>
            </div>
            <div className="col-12 my-1">
              <span><strong>Street:</strong> {appcontext?.user?.street}</span>
            </div>
            <div className="col-12 my-1">
              <span><strong>Register date:</strong> {appcontext?.user?.join_date.toString()}</span>
            </div>
            <div className="col-12 my-1">
              <span><strong>Age:</strong> {appcontext?.user?.user_age}</span>
            </div>
            <div className="col-12 my-1">
              <span><strong>User ID:</strong> {appcontext?.user?.user_id.toString()}</span>
            </div>
            <div className="col-12 my-1">
              <span><strong>Email:</strong> {appcontext?.user?.user_email}</span>
            </div>
            <div className="col-12 my-1">
              <span><strong>Login:</strong> {appcontext?.user?.user_login}</span>
            </div>
            <div className="col-12 mt-1">
              <span><strong>Phone number:</strong> {appcontext?.user?.user_phone_number}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UserDetails;
