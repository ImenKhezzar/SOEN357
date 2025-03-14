import "./App.css";
import React, { useEffect, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API";

function JoinScreen({
  getMeetingAndToken,
}: {
  getMeetingAndToken: (meeting?: string) => void;
}) {
  const [meetingIdInput, setMeetingIdInput] = useState("");

  return (
    <div>
      <button onClick={() => getMeetingAndToken()}>Create Meeting</button>
      <input
        type="text"
        placeholder="Enter Meeting ID"
        value={meetingIdInput}
        onChange={(e) => setMeetingIdInput(e.target.value)}
      />
      <button onClick={() => getMeetingAndToken(meetingIdInput)}>Join Meeting</button>
    </div>
  );
}

// Participant View Component
const ParticipantView = ({ participantId }: { participantId: string }) => {
  const { micOn, displayName } = useParticipant(participantId);

  return (
    <div>
      <p>Participant: {displayName}</p>
      <p>Mic Status: {micOn ? "On" : "Off"}</p>
    </div>
  );
};

// Meeting View Component
const MeetingView = () => {
  const { join, participants, localMicOn, unmuteMic, muteMic } = useMeeting({
    onParticipantJoined: (participant) => {
      console.log("Participant Joined:", participant);
    },
  });

  useEffect(() => {
    join(); // Auto join when component mounts
  }, []);

  useEffect(() => {
    console.log("Mic status updated:", localMicOn);
  }, [localMicOn]);

  return (
    <div>
      <h3>Meeting</h3>
      <p>Local Mic is {localMicOn ? "On" : "Off"}</p>
      
      <button onClick={muteMic}>Mute Mic</button>
      <button onClick={unmuteMic}>Unmute Mic</button>

      <h4>Participants:</h4>
      <ul>
        {Array.from(participants.keys()).map((participantId) => (
          <li key={participantId}>
            <ParticipantView participantId={participantId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const getMeetingAndToken = async (id?: string) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Imen",
      }}
      token={authToken}
    >
      <MeetingView />
      <button onClick={onMeetingLeave}>Leave Meeting</button>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default App;
