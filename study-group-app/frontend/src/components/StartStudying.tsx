import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import { authToken, createMeeting } from "../API";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function StartStudying() {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [inputMeetingId, setInputMeetingId] = useState<string>("");

  const authContext = useAuth();
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { auth } = authContext;

  // 🔹 Generate a unique & reusable meeting ID for each user
  const getPersonalRoomId = (username: string) => {
    return btoa(username).replace(/=/g, ""); // Base64 encode (removes '=' for cleaner ID)
  };


  const getMeetingAndToken = async (id?: string) => {
    if (meetingId) {
      console.log("Already in a meeting, not joining again.");
      return;
    }
    const newMeetingId = id ?? (await createMeeting({ token: authToken }));
    setMeetingId(newMeetingId);
    navigate(`/room/${newMeetingId}`);
  };

  return (
    <div className="start-studying-container">
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
          <h3>Start Studying</h3>

     
          <Button
            variant="contained"
            startIcon={<PersonIcon />}
            sx={{
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#9387B4",
              border: "2px solid #9387B4",
            }}
            onClick={() => getMeetingAndToken(getPersonalRoomId(auth.username))}
          >
            {auth.username}'s Study Room
          </Button>

         
          <input
            type="text"
            placeholder="Enter Meeting Id"
            onChange={(e) => setInputMeetingId(e.target.value)}
          />

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
              onClick={() => inputMeetingId && getMeetingAndToken(inputMeetingId)}
            >
              Join Room
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default StartStudying;
