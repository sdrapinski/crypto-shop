import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../state/AppContext";
import axios from "axios";
import {UserOrderHistory} from "../../../interfaces/Profile.interface";

export const UserOrders = () => {

    const appContext = useContext(AppContext);
    const userId = appContext?.user?.user_id;

    const [orders, setOrders] = useState<UserOrderHistory[]>([]);

    useEffect(() => {
        if(userId !== undefined){
            axios
                .get(
                    `${appContext?.backendUrl}/user/getOrdersHistory/${userId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        }
                    }
                )
                .then((response)=>{
                    setOrders(response.data);
                });
        }
    },[userId]);

    return <div className="tab-pane fade show active row justify-content-center align-items-center flex-column">
        {orders.map((order) => (
            <div className={"card card-body row my-1"}>
                <div className={"row col-12"}>
                    <span className="d-flex flex-wrap col-12" style={{wordWrap: "break-word", wordBreak: "break-all"}}>
                        {order?.product_name}
                    </span>
                </div>
                <div className={"col-12 d-flex justify-content-end align-items-center mt-2"}>
                    <button type={"button"} className={"btn btn-primary"}>View</button>
                </div>
            </div>
        ))}
    </div>;
};
