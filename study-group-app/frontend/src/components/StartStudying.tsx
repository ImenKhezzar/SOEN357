import { useState } from "react";
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
    <div>
        <div className='purple-box' style={{ width: '25vw', marginBottom: '1em', padding: '2vw'}}>
           <div style={{ marginBottom: '1em',  }}>
            <span style={{marginRight: '4em'}}><b> Personal Room </b></span>
              <Button
                variant="contained"
                startIcon={<PersonIcon />}
                sx={{
                  textTransform: "none",
                  color: "#white",
                  backgroundColor: "#927AF4",
                  width: '50%'
                }}
                onClick={() => getMeetingAndToken(getPersonalRoomId(auth.username))}
              >
                {auth.username}'s Study Room
              </Button>
            <p style={{color: 'grey'}}> Your private Study Space </p>
         </div>
        </div>
        
        <div className="purple-box" style={{ width: '25vw', marginBottom: '1em', padding: '2vw'}}>
            <div>
                <span style={{marginRight: '5em'}}><b>Create a Room</b></span>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                textTransform: "none",
                backgroundColor: "#78CFEB",
                color: "white",
                width: "50%",
              }}
              onClick={() => getMeetingAndToken()}
            >
              Create Room
            </Button>
            </div>
            <p style={{color: 'grey'}}> Start a study session with friends </p>
        </div>

        <div className='purple-box' style={{ width: '25vw', padding: '2vw', marginBottom: '2em'}}>
            <div style={{ justifyContent: 'center', marginBottom: '1em', textAlign: 'center' }}>
            <span style={{fontWeight: 'bold', textAlign: 'center'}}><p> Join a Room </p></span>
          <input
            type="text"
            placeholder="Enter Meeting Id"
            onChange={(e) => setInputMeetingId(e.target.value)}
          /> <br/> <br/>

            <Button
              variant="outlined"
              startIcon={<GroupsIcon />}
              sx={{
                textTransform: "none",
                backgroundColor: "#927AF4",
                color: "white",
                width: "30%",
              }}
              onClick={() => inputMeetingId && getMeetingAndToken(inputMeetingId)}
            >
              Join Room
            </Button>
            </div>
          </div>
      </div>
    
  );
}

export default StartStudying;