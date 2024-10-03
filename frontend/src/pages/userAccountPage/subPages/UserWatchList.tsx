import React from "react";

const UserWatchList = () => {
    return <div className="tab-pane fade show active row justify-content-center align-items-center flex-column">
        <div className={"card card-body row"}>
            <div className={"row col-12"}>
                    <span className="d-flex flex-wrap col-12" style={{wordWrap: "break-word", wordBreak: "break-all"}}>
                        test
                    </span>
            </div>
            <div className={"col-12 d-flex justify-content-end align-items-center mt-2"}>
                <button type={"button"} className={"btn btn-primary me-2"}>Show</button>
                <button type={"button"} className={"btn btn-danger"}>Delete</button>
            </div>
        </div>
    </div>;
};

export default UserWatchList;
