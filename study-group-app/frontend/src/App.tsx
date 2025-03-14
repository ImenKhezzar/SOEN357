import "./App.css";
import { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API";
import MeetingView from "./components/MeetingView"; 

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
      <button onClick={() => getMeetingAndToken(meetingIdInput)}>
        Join Meeting
      </button>
    </div>
  );
}

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
       <p><strong>Meeting ID:</strong> {meetingId}</p>
      <MeetingView />
      <button onClick={onMeetingLeave}>Leave Meeting</button>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default App;
