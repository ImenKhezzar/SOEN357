import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { authToken, createMeeting } from "../API";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function StartStudying() {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const authContext = useAuth();
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  const { auth } = authContext;
  console.log(auth.username);

  const getMeetingAndToken = async (id?: string) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
    navigate(`/room/${meetingId}`);
  };

  return (
    <div className="start-studying-container">
      {" "}
      <div
        className="white-box"
        style={{
          width: "100%",
          maxWidth: "40%",
          maxHeight: "80vw",
          margin: "auto",
        }}
      >
        <Stack spacing={2} direction={"column"}>
          <h3> Start Studying </h3>
          <Button
            variant="contained"
            startIcon={<PersonIcon />}
            sx={{
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#9387B4",
              border: "2px solid #9387B4",
            }}
          >
            {auth.username}'s Study Room
          </Button>
          <Stack
            spacing={2}
            direction="row"
            sx={{ width: "100%", justifyContent: "space-between" }}
          >
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                textTransform: "none",
                backgroundColor: "#fff",
                color: "#374151",
                border: "1px solid #374151",
                width: "50%",
              }}
              onClick={() => getMeetingAndToken()}
            >
              Create Room
            </Button>
            <Button
              variant="outlined"
              startIcon={<GroupsIcon />}
              sx={{
                textTransform: "none",
                backgroundColor: "#fff",
                color: "#374151",
                border: "1px solid #374151",
                width: "50%",
              }}
            >
              Join Room{" "}
            </Button>
          </Stack>
        </Stack>
      </div>{" "}
    </div>
  );
}

export default StartStudying;
