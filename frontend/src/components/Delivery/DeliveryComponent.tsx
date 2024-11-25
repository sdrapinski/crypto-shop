import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../../state/AppContext";

const DeliveryComponent = () => {

    const appContext = useContext(AppContext);
    const user = appContext?.user;
    const userRegion = user?.user_region;

    console.log(user)

  return (
      <div className="section__content">
          <section id={'shipping-options'}>
              <div className={'row'}>
                  <div className={'col-6'}>
                      <label htmlFor="city">City</label>
                      <input value={user?.user_name} className={'form-control'} name={'city'} type="text"/>
                  </div>
                  <div className={'col-6'}>
                      <label htmlFor="street">Street</label>
                      <input value={userRegion?.street} className={'form-control'} name={'street'} type="text"/>
                  </div>
              </div>
              <div className={'row'}>
                  <div className={'col-6'}>
                      <label htmlFor="houseNumber">House number</label>
                      <input className={'form-control'} name={'houseNumber'} type="text"/>
                  </div>
                  <div className={'col-6'}>
                      <label htmlFor="postcode">Post code</label>
                      <input value={userRegion?.postCode} className={'form-control'} name={'postcode'} type="text"/>
                  </div>
              </div>
              <div className={'row'}>
                  <div className={'col-6'}>
                      <label htmlFor="phoneNumber">Phone number</label>
                      <input value={user?.user_phone_number} className={'form-control'} name={'houseNumber'} type="text"/>
                  </div>
                  <div className={'col-6'}>
                      <label htmlFor="email">Email</label>
                      <input value={user?.user_email} className={'form-control'} name={'email'} type="text"/>
                  </div>
              </div>
              <div className={'row'}>
                  <div className={'col-6'}>
                      <label htmlFor="delivery">Delivery option:</label>
                      <select className={'form-select'} name="delivery" id="delivery">
                          <option value="inpost">InPost</option>
                          <option value="dpd">DPD</option>
                          <option value="dhl">DHL</option>
                          <option value="courier">Courier</option>
                      </select>
                  </div>
              </div>
          </section>
      </div>
  )
}

export default DeliveryComponent