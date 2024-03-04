import axios from "axios";
import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../state/AppContext";

const UserWallets = () => {

  const appContext = useContext(AppContext);
    useEffect(() => {
      axios
        .get(`${appContext?.backendUrl}/user/account`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((resp) => {
          console.log(resp);
        });
  
      return () => {};
    }, []);
    
  
  return (
    <section className="tab-pane fade show active wallets-content">
       <div>
        <p>1# wallet</p>
        
          <div className="btn-footer">
            <button type="button" className="edit">Edytuj</button>
            <button type="button" className="remove">Usuń</button>
          </div>
        </div>
        <div>
        <p>2# wallet</p>
        
          <div className="btn-footer">
            <button type="button" className="edit">Edytuj</button>
            <button type="button" className="remove">Usuń</button>
          </div>
        </div>
        <div>
        <p>3# wallet</p>
        
          <div className="btn-footer">
            <button type="button" className="edit">Edytuj</button>
            <button type="button" className="remove">Usuń</button>
          </div>
        </div>
        <div>
        <p>4# wallet</p>
        
          <div className="btn-footer">
            <button type="button" className="edit">Edytuj</button>
            <button type="button" className="remove">Usuń</button>
          </div>
        </div>
        <div>
        <p>5# wallet</p>
        
          <div className="btn-footer">
            <button type="button" className="edit">Edytuj</button>
            <button type="button" className="remove">Usuń</button>
          </div>
        </div>
        <div>
        <p>6# wallet</p>
        
          <div className="btn-footer">
            <button type="button" className="edit">Edytuj</button>
            <button type="button" className="remove">Usuń</button>
          </div>
        </div>
        <div className="new">
        <p>New wallet</p>
          <div className="btn-footer">
            <button type="button" className="add">Dodaj</button>
          </div>
        </div>
    </section>
    );
};

export default UserWallets;
