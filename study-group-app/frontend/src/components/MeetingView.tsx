import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import ParticipantView from "./ParticipantView";
import WhiteBoard from "./WhiteBoard";
import Controls from "./Controls";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

const MeetingView = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { join, leave, end, participants, localMicOn, unmuteMic, muteMic } =
    useMeeting({
      onParticipantJoined: (participant) => {
        console.log("Participant Joined:", participant);
      },
    });

  useEffect(() => {
    if (participants.size === 0) {
      console.log("Joining meeting...");
      join();
    } else {
      console.log("Already joined, skipping...");
    }
  }, [join, participants.size]);

  useEffect(() => {
    console.log("Current participants:", Array.from(participants.keys()));
  }, [participants]);

  const handleLeave = () => {
    leave();
    navigate("/homepage");
  };

  const handleEndMeeting = () => {
    end();
    navigate("/homepage");
  };

  return (
    <div className="meeting-room">
      <h3>Meeting: {roomId}</h3>

      <Controls />
      <WhiteBoard />

      <h4>Participants:</h4>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Array.from(participants.keys()).map((participantId) => (
          <ParticipantView key={participantId} participantId={participantId} />
        ))}
      </div>

      <Button variant="contained" onClick={handleLeave}>
        Leave Meeting
      </Button>

      <Button variant="contained" onClick={handleEndMeeting}>
        End Meeting
      </Button>
    </div>
  );
};

export default MeetingView;
