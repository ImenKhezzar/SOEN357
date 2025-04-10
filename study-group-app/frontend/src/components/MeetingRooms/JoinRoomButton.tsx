import React from "react";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";

interface JoinRoomButtonProps {
  onClick: () => Promise<void>;
}

const JoinRoomButton: React.FC<JoinRoomButtonProps> = ({ onClick }) => (
  <Button
    variant="contained"
    startIcon={<GroupsIcon />}
    sx={{
      textTransform: "none",
      backgroundColor: "#927AF4",
      color: "white",
      width: "30%",
    }}
    onClick={onClick}
  >
    Join Room
  </Button>
);

export default JoinRoomButton;
