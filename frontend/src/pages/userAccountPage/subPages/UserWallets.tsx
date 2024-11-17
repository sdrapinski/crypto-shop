import axios from "axios";
import React, {useEffect, useContext, useState} from "react";
import { AppContext } from "../../../state/AppContext";
import blockchainService ,{ getUserWalletAddress } from "../../../services/Blockchain";
import { Row,Col } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";


const UserWallets = () => {

  const appContext = useContext(AppContext);
  const axiosInstance = useAxios(appContext!);
  const backendUrl = appContext?.backendUrl;
  const userId = appContext?.user?.user_id;
  const [userWallets, setUserWallets] = useState(appContext?.user?.user_wallets|| []);
  const [userWallet, setuserWallet] = useState<null| string>( appContext?.user?.user_wallets[0].wallet_address || null)

  useEffect(() => {
    console.log(appContext?.user)
  }, [])
  
  const activateWallet = async (wallet: string) => {
    const userId = appContext?.user?.user_id;
    if (!userId || !wallet) {
      console.error("Brak danych użytkownika lub portfela");
      return;
    }
    try {
      await blockchainService.registerSeller(userId, wallet);
      const response = await axiosInstance.post("/wallet/activate", {
        user_id: userId,
        wallet_address: wallet,
      });
  
      if (response.status === 200) {
        // Zmień status portfela w interfejsie
        setUserWallets((prevWallets) =>
          prevWallets.map((w) =>
            w.wallet_address === wallet ? { ...w, wallet_status: "Active" } : w
          )
        );
        alert("Portfel został aktywowany!");
      }
    } catch (error) {
      console.error("Błąd podczas aktywacji portfela:", error);
      alert("Nie udało się aktywować portfela.");
    }
  };



  const saveUserWallet = (e:React.FormEvent<HTMLButtonElement>) =>{
 

      getUserWalletAddress().then((wallet)=>{
        axiosInstance
          .post(
              `/user/createWallet`,
              {
                  user_wallet_address: wallet,
                  user_id:userId
              }
          )
          .then(response => {
            console.log(response)
            
            setuserWallet(response.data);
          })
          .catch((err)=>console.error(err))
          
    })

      
  }

  return (
    <section className="userWallets tab-pane fade show active  w-100">
       <Row>
           {/* <div className='col-12'>
               <input type="text" value={userWallet} className='form-control form-control-sm' onChange={walletInputHandler}/>
           </div> */}
           <Col>
           <img src="./MetaMask.png" alt="MetaMask wallet" className="userWallets__MetaMask" />
               <button id='save-wallet' type='button' className='btn btn-primary' onClick={saveUserWallet}>
                {
                    userWallet? <>{userWallet}</> : userWallets.length > 0 ? <>{userWallets[0].wallet_address}</> : <>Add your wallet</>
                }
               
                </button>
           </Col>
       </Row>
       <Row>
        {userWallets && userWallets.length > 0 ? <div> <Row> <span>Your saved Wallets </span></Row> 
        {
            userWallets.map((wallet)=>(<Row>
                <div className={"card card-body row"}>
            <div className={"row col-12"}>
                    
                    <span className="d-flex flex-wrap col-12" style={{wordWrap: "break-word", wordBreak: "break-all"}}>
                        {wallet.wallet_address}
                    </span>
            </div>
            <div className={"col-12 d-flex justify-content-end align-items-center mt-2"}>
            <button
                type="button"
                className={`btn ${wallet.wallet_status === "Active" ? "btn-secondary" : "btn-success"} me-2`}
                onClick={() => wallet.wallet_status !== "Active" && activateWallet(wallet.wallet_address)}
                disabled={wallet.wallet_status === "Active"}
                >
                {wallet.wallet_status === "Active" ? "Wallet Activated" : "Activate this wallet at blockchain"}
            </button>
                <button type={"button"} className={"btn btn-danger"}>Delete</button>
            </div>
        </div>
            </Row>))
        }
        
        </div>  : <></>}
       </Row>

    </section>
  );
};

export default UserWallets;
