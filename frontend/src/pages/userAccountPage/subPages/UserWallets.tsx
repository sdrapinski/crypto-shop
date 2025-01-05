import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../state/AppContext";
import blockchainService, {
  getUserWalletAddress,
} from "../../../services/Blockchain";
import { Row, Col } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import { cryptoWallet } from "../../../classes/User";

const UserWallets = () => {
  const appContext = useContext(AppContext);
  const {user} = appContext!
  const axiosInstance = useAxios(appContext!);
  const backendUrl = appContext?.backendUrl;
  const userId = appContext?.user?.user_id;
  const [loadingWallet, setLoadingWallet] = useState<string | null>(null);
  const [userWallets, setUserWallets] = useState<cryptoWallet[] | []>([]);
  const [userWallet, setuserWallet] = useState<null | string>(null);

  useEffect(() => {
    setUserWallets(appContext?.user?.user_wallets || []);
    
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setuserWallet(accounts[0]);
      } else {
        console.warn("Couldnt find any wallets");
      }
    };
  
    
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    } else {
      console.warn("MetaMask is not installed!");
    }
  
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  useEffect(() => {
    if(appContext){
      if(appContext.user){
        if(appContext.user.user_wallets){
          if(appContext.user.user_wallets.length > 0){
            setuserWallet(appContext.user.user_wallets[0].wallet_address)
          }
        }
      }
    }
    
    return () => {
      
    }
  }, [appContext,user])
  

  const activateWallet = async (wallet: string) => {
    const userId = appContext?.user?.user_id;
    if (!userId || !wallet) {
      console.error("No user or wallet data");
      return;
    }
    setLoadingWallet(wallet);
    try {
      const checkResponse = await axiosInstance.post("/user/checkWalletAssignment", {
        wallet_address: wallet,
      });
  
      if (checkResponse.data.isAssigned) {
        alert("This wallet is already activated by another user.");
        return;
      }

      const metaMaskOperationPermission = await blockchainService.registerSeller(userId, wallet)
      if(!metaMaskOperationPermission){
        alert("Failed to activate wallet.");
        return;
      }
      const response = await axiosInstance.post("/user/activateWallet", {
        user_id: userId,
        wallet_address: wallet,
      });

      if (response.status === 201) {
        
        setUserWallets((prevWallets) =>
          prevWallets.map((w) =>
            w.wallet_address === wallet ? { ...w, wallet_status: "Active" } : w
          )
        );
        alert("The wallet has been activated!");
      }
    } catch (error) {
      console.error("Error activating wallet:", error);
      alert("Failed to activate wallet.");
    } finally {
      setLoadingWallet(null);
    }
  };

  const saveUserWallet = (e: React.FormEvent<HTMLButtonElement>) => {
    getUserWalletAddress().then((wallet) => {
      if (userWallets.some((w) => w.wallet_address === wallet)) {
        alert("This wallet has already been added!");
        return;
      }
      axiosInstance
        .post<cryptoWallet>(`/user/createWallet`, {
          user_wallet_address: wallet,
          user_id: userId,
        })
        .then((response) => {
          console.log(response);

          setUserWallets((prevWallets) => [
            ...prevWallets,
            response.data,
          ]);

          setuserWallet(response.data.wallet_address);
        })
        .catch((err) => console.error(err));
    });
  };

  const deleteWallet = async (walletId: string) => {
    try {
      const response = await axiosInstance.post("/user/deleteWallet", {
        wallet_id: walletId
        
      });
  
      if (response.status === 200) {
        setUserWallets((prevWallets) =>
          prevWallets.filter((wallet) => wallet.wallet_id !== walletId)
        );
        alert("Wallet has been deleted");
      }
    } catch (error) {
      console.error("Unable to remove wallet", error);
      alert("Unable to remove wallet");
    }
  };
  



  return (
    <section className="userWallets tab-pane fade show active  w-100">
      <Row>
        {/* <div className='col-12'>
               <input type="text" value={userWallet} className='form-control form-control-sm' onChange={walletInputHandler}/>
           </div> */}
        <Col>
          <img
            src="./MetaMask.png"
            alt="MetaMask wallet"
            className="userWallets__MetaMask"
          />
          <button
            id="save-wallet"
            type="button"
            className="btn btn-primary"
            onClick={saveUserWallet}
          >
            {userWallet ? (
              <>{userWallet}</>
            ) : userWallets.length > 0 ? (
              <>{userWallets[0].wallet_address}</>
            ) : (
              <>Add your wallet</>
            )}
          </button>
        </Col>
      </Row>
      <Row>
        {userWallets && userWallets.length > 0 ? (
          <div>
            {" "}
            <Row>
              {" "}
              <span>Your saved Wallets </span>
            </Row>
            {userWallets.map((wallet) => (
              <Row key={wallet.wallet_id}>
                <div className={"card card-body row"}>
                  <div className={"row col-12"}>
                    <span
                      className="d-flex flex-wrap col-12"
                      style={{ wordWrap: "break-word", wordBreak: "break-all" }}
                    >
                      {wallet.wallet_address}
                    </span>
                  </div>
                  <div
                    className={
                      "col-12 d-flex justify-content-end align-items-center mt-2"
                    }
                  >
                    <button
                      type="button"
                      className={`btn ${
                        wallet.wallet_status === "Active"
                          ? "btn-success"
                          : "btn-primary"
                      } me-2`}
                      onClick={() =>
                        wallet.wallet_status !== "Active" &&
                        activateWallet(wallet.wallet_address)
                      }
                      disabled={
                        wallet.wallet_status === "Active" ||
                        loadingWallet === wallet.wallet_address
                      }
                    >
                      {wallet.wallet_status === "Active"
                        ? "Wallet Activated"
                        : loadingWallet === wallet.wallet_address
                        ? "Loading..."
                        : "Activate this wallet at blockchain"}
                    </button>
                    <button onClick={() => deleteWallet(wallet.wallet_id)} type={"button"} className={"btn btn-danger"} disabled={
                        wallet.wallet_status === "Active" ||
                        loadingWallet === wallet.wallet_address
                      }>
                    {wallet.wallet_status === "Active" ? <>You can't delete active wallet</> : <> Delete </>}  
                    </button>
                  </div>
                </div>
              </Row>
            ))}
          </div>
        ) : (
          <></>
        )}
      </Row>
    </section>
  );
};

export default UserWallets;
