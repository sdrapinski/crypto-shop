import React from "react";

const UserSettings = () => {
  return (
    <div className="tab-pane fade show active" id="settings-content">
      <div className="row mb-4">
        <div className="col-4">Switch Darkmode</div>
        <div className="col-4 d-flex justify-content-end">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" />
          </div>
        </div>
      </div>

      <div className="row my-1">
        <div className="col-4">Edit data</div>
        <div className="col-4 d-flex justify-content-end">
          <button type="button" className="btn btn-custom btn-sm">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
