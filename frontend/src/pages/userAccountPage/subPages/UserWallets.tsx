import axios from "axios";
import React, {useEffect, useContext, useState} from "react";
import { AppContext } from "../../../state/AppContext";

const UserWallets = () => {

  const appContext = useContext(AppContext);
  const [userWallet, setUserWallet] = useState(appContext?.user?.user_wallet_address || '');

  const walletInputHandler = (e:React.FormEvent<HTMLInputElement>) =>{
      setUserWallet(e.currentTarget.value);
  };

  const saveUserWallet = (e:React.FormEvent<HTMLButtonElement>) =>{
      const backendUrl = appContext?.backendUrl;
      const userId = appContext?.user?.user_id;

      axios
          .put(
              `${backendUrl}/user/update/wallet`,
              {
                  user_wallet_address: userWallet,
                  user_id:userId
              },
              {
                  headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                  },
              }
          )
          .then(response => {
              setUserWallet(response.data);
          });
  }

  return (
    <section className="tab-pane fade show active d-flex w-100">
       <div className='card card-body row col-12'>
           <div className='col-12'>
               <input type="text" value={userWallet} className='form-control form-control-sm' onChange={walletInputHandler}/>
           </div>
           <div className='col-2 mt-2 ms-auto d-flex justify-content-end'>
               <button id='save-wallet' type='button' className='btn btn-primary' onClick={saveUserWallet}>Zapisz</button>
           </div>
       </div>
    </section>
  );
};

export default UserWallets;
