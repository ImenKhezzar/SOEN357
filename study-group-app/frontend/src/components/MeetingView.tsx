import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import ParticipantView from "./ParticipantView";
import WhiteBoard from "./WhiteBoard";
import Controls from "./Controls";
import { useParams } from "react-router-dom";

const MeetingView = () => {
  const { roomId } = useParams();

  const { join, participants, localMicOn, unmuteMic, muteMic } = useMeeting({
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

  return (
    <div>
      <h3>Meeting: {roomId}</h3>

      <Controls />
      <WhiteBoard />

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
