import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import { authToken, createMeeting } from "../API";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PersonalRoomButton = ({ username, onClick }: { username: string; onClick: () => void }) => (
  <Button
    variant="contained"
    startIcon={<PersonIcon />}
    sx={{
      textTransform: "none",
      color: "#fff",
      backgroundColor: "#9387B4",
      border: "2px solid #9387B4",
    }}
    onClick={onClick}
  >
    {username}'s Study Room
  </Button>
);

const CreateRoomButton = ({ onClick }: { onClick: () => void }) => (
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
    onClick={onClick}
  >
    Create Room
  </Button>
);

const JoinRoomButton = ({ onClick }: { onClick: () => void }) => (
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
    onClick={onClick}
  >
    Join Room
  </Button>
);

function StartStudying() {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [inputMeetingId, setInputMeetingId] = useState<string>("");

  const authContext = useAuth();
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { auth } = authContext;

  const getPersonalRoomId = (username: string) => {
    return btoa(username).replace(/=/g, "");
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
          <PersonalRoomButton
            username={auth.username}
            onClick={() => getMeetingAndToken(getPersonalRoomId(auth.username))}
          />
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
            <CreateRoomButton onClick={() => getMeetingAndToken()} />
            <JoinRoomButton onClick={() => inputMeetingId && getMeetingAndToken(inputMeetingId)} />
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default StartStudying;
