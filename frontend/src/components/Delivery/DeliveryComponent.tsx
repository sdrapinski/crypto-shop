import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../../state/AppContext";

// Typy dla danych formularza
interface FormData {
    city: string;
    street: string;
    postcode: string;
    phoneNumber: number | null;
    email: string;
    delivery: string;
}

const DeliveryComponent: React.FC = () => {
    const appContext = useContext(AppContext);
    const user = appContext?.user;
    const userRegion = user?.user_region;

    // Stan dla formularza z typowaniem
    const [formData, setFormData] = useState<FormData>({
        city: user?.user_name || '',
        street: userRegion?.street || '',
        postcode: userRegion?.postCode || '',
        phoneNumber: user?.user_phone_number ? parseInt(user?.user_phone_number) : null,
        email: user?.user_email || '',
        delivery: 'inpost', // Domyślna wartość
    });

    useEffect(() => {
      
    setFormData({city: user?.user_name || '',
      street: userRegion?.street || '',
      postcode: userRegion?.postCode || '',
      phoneNumber: user?.user_phone_number ? parseInt(user?.user_phone_number) : null,
      email: user?.user_email || '',
      delivery: 'inpost'})
      
    }, [appContext?.user])
    

    // Typowanie dla funkcji obsługi zmian
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="section__content">
            <section id={'shipping-options'}>
                <div className={'row'}>
                    <div className={'col-6'}>
                        <label htmlFor="city">City</label>
                        <input
                            value={formData.city}
                            onChange={handleInputChange}
                            className={'form-control'}
                            name={'city'}
                            type="text"
                        />
                    </div>
                    <div className={'col-6'}>
                        <label htmlFor="street">Street</label>
                        <input
                            value={formData.street}
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
                            value={formData.postcode}
                            onChange={handleInputChange}
                            className={'form-control'}
                            name={'postcode'}
                            type="text"
                        />
                    </div>
                    <div className={'col-6'}>
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input
                            value={formData.phoneNumber ? formData.phoneNumber : ''}
                           
                            className={'form-control'}
                            name={'phoneNumber'}
                            type="number"
                            onChange={(e) => {
                              const value = e.target.value;
                              // Sprawdzanie, czy długość jest mniejsza niż 12 i zawiera tylko cyfry
                              if (/^\d{0,11}$/.test(value)) {
                                  handleInputChange(e); // Zaktualizuj stan
                              }
                          }}
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-6'}>
                        <label htmlFor="email">Email</label>
                        <input
                            value={formData.email}
                            onChange={handleInputChange}
                            className={'form-control'}
                            name={'email'}
                            type="email"
                        />
                    </div>
                    <div className={'col-6'}>
                        <label htmlFor="delivery">Delivery option:</label>
                        <select
                            value={formData.delivery}
                            onChange={handleInputChange}
                            className={'form-select'}
                            name="delivery"
                            id="delivery"
                        >
                            <option value="inpost">InPost</option>
                            <option value="dpd">DPD</option>
                            <option value="dhl">DHL</option>
                            <option value="courier">Courier</option>
                        </select>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DeliveryComponent;
