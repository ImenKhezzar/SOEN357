import "../App.css";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import { authToken, createMeeting } from "../API";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "./Header";
import Logout from '../components/Authentication/Logout';

const Sidebar = () => {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [inputMeetingId, setInputMeetingId] = useState<string>("");

  const authContext = useAuth();
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { auth } = authContext;

  // Generate a unique & reusable meeting ID for each user
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
    <div className="sidebar">
      <Header />
      <ul className="sidebar-menu">
        <li>
          {" "}
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
        </li>
        <li>
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
        </li>
        <li>
          <input
            type="text"
            placeholder="Enter Meeting Id"
            onChange={(e) => setInputMeetingId(e.target.value)}
          />
        </li>
        <li>
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
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
        <li>
          <a href="#">Settings</a>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
