import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import ParticipantView from "./ParticipantView";
import WhiteBoard from "./WhiteBoard";
import Controls from "./Controls";


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
