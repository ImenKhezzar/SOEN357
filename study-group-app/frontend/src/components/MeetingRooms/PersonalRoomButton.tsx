import React from "react";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";

interface PersonalRoomButtonProps {
  username: string;
  onClick: () => void;
}

const PersonalRoomButton: React.FC<PersonalRoomButtonProps> = ({ username, onClick }) => (
  <Button
    variant="contained"
    startIcon={<PersonIcon />}
    sx={{
      textTransform: "none",
      color: "#white",
      backgroundColor: "#927AF4",
      width: '40%'

    }}
    onClick={onClick}
  >
    {username}'s Study Room
  </Button>
);

export default PersonalRoomButton;
