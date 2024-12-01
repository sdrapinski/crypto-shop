import React from 'react';

interface ShippingDetailsProps {
  deliveryData: {
    city: string;
    street: string;
    postcode: string;
    phoneNumber: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeliveryComponent: React.FC<ShippingDetailsProps> = ({ deliveryData, handleInputChange }) => {
  return (
    <div className="section">
      <div className="section__title">Shipping Details</div>
      <div className="section__content">
        <div className={'row'}>
          <div className={'col-6'}>
            <label htmlFor="city">City</label>
            <input
              value={deliveryData.city}
              onChange={handleInputChange}
              className={'form-control'}
              name={'city'}
              type="text"
            />
          </div>
          <div className={'col-6'}>
            <label htmlFor="street">Street</label>
            <input
              value={deliveryData.street}
              onChange={handleInputChange}
              className={'form-control'}
              name={'street'}
              type="text"
            />
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-6'}>
            <label htmlFor="postcode">Post code</label>
            <input
              value={deliveryData.postcode}
              onChange={handleInputChange}
              className={'form-control'}
              name={'postcode'}
              type="text"
            />
          </div>
          <div className={'col-6'}>
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              value={deliveryData.phoneNumber}
              onChange={handleInputChange}
              className={'form-control'}
              name={'phoneNumber'}
              type="text"
            />
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-12'}>
            <label htmlFor="email">Email</label>
            <input
              value={deliveryData.email}
              onChange={handleInputChange}
              className={'form-control'}
              name={'email'}
              type="email"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryComponent;
