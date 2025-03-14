import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import ParticipantView from "./ParticipantView"; 

const MeetingView = () => {
  const { join, participants, localMicOn, unmuteMic, muteMic } = useMeeting({
    onParticipantJoined: (participant) => {
      console.log("Participant Joined:", participant);
    },
  });

  useEffect(() => {
    join(); 
  }, []);

  return (
    <div>
      <h3>Meeting</h3>
      <p>Local Mic is {localMicOn ? "On" : "Off"}</p>

      <button onClick={muteMic}>Mute Mic</button>
      <button onClick={unmuteMic}>Unmute Mic</button>

      <h4>Participants:</h4>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Array.from(participants.keys()).map((participantId) => (
          <ParticipantView key={participantId} participantId={participantId} />
        ))}
      </div>
    </div>
  );
};

export default MeetingView;
