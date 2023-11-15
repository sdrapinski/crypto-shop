import React from "react";

interface UserButtonProps {
  isActive: boolean;
  Text: string;
  onClick: (text: string) => void;
}

const UserButton: React.FC<UserButtonProps> = (props) => {
  return (
    <button
      className={`nav-link  ${props.isActive ? "active" : ""}`}
      id="profile-tab"
      data-bs-target="#profile-content"
      type="button"
      onClick={() => props.onClick(props.Text)}
    >
      {props.Text}
    </button>
  );
};

export default UserButton;
