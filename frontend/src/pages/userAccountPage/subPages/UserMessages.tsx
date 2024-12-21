import React, {useContext, useEffect} from "react";
import {AppContext} from "../../../state/AppContext";
import {UserMessage} from "../../../interfaces/Profile.interface";
import axios from "axios";

const UserMessages = () => {
    const appContext = useContext(AppContext);
    const userId = appContext?.user?.user_id;

    const [messages, setMessages] = React.useState<UserMessage[]>([]);

    useEffect(() => {
        if (userId !== undefined) {
            axios
                .get(
                    `${appContext?.backendUrl}/user/getUserMessages/${userId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        }
                    }
                )
                .then((response) => {
                    setMessages(response.data);
                })
        }
    }, [userId])


    return <div className="tab-pane fade show active row justify-content-center align-items-center flex-column">
        {messages.map((msg) => (
            <div className={"card card-body row my-1"}>
                <div className={"row col-12"}>
                    <span className="d-flex flex-wrap col-12" style={{wordWrap: "break-word", wordBreak: "break-all"}}>
                        Sender Name: {msg?.sender.user_name} {msg?.sender.user_surname}
                    </span>
                    <span className="d-flex flex-wrap col-12" style={{wordWrap: "break-word", wordBreak: "break-all"}}>
                        Sender Email: {msg?.sender.user_email}
                    </span>
                    <span className="d-flex flex-wrap col-12 mt-3" style={{wordWrap: "break-word", wordBreak: "break-all"}}>
                        Content: {msg?.message.content}
                    </span>
                </div>
                <div className={"col-12 d-flex justify-content-end align-items-center mt-2"}>
                    <button type={"button"} className={"btn btn-primary"}>Chat</button>
                </div>
            </div>
        ))}
        {messages.length === 0 && (
            <div>
                You dont have any messages
            </div>
        )}
    </div>;
};

export default UserMessages;
