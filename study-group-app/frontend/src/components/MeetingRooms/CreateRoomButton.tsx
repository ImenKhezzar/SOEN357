import React from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface CreateRoomButtonProps {
  onClick: () => Promise<void>;
}

const CreateRoomButton: React.FC<CreateRoomButtonProps> = ({ onClick }) => (
  <Button
    variant="contained"
    startIcon={<AddCircleOutlineIcon />}
    sx={{
      textTransform: "none",
      backgroundColor: "#78CFEB",
      color: "white",
      width: "50%",
    }}
    onClick={onClick}
  >
    Create New Room
  </Button>
);

export default CreateRoomButton;
