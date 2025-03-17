import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import PersonIcon from "@mui/icons-material/Person";
import { authToken, createMeeting } from "../API";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { JoinScreen } from "./JoinScreen";

function StartStudying() {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const authContext = useAuth();
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { auth } = authContext;
  console.log(auth.username);

  const getMeetingAndToken = async (id?: string) => {
    if (meetingId) {
      console.log("Already in a meeting, not joining again.");
      return;
    }
    const newMeetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(newMeetingId);
    navigate(`/room/${newMeetingId}`);
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
          <JoinScreen getMeetingAndToken={getMeetingAndToken} />
        </Stack>
      </div>{" "}
    </div>
  );
}

export default StartStudying;
