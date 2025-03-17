import { useParams } from "react-router-dom";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingView from "./MeetingView";
import { authToken } from "../API";
import useAuth from "../hooks/useAuth";

const MeetingRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { auth } = authContext;
  const username =auth.username;

  return (
    <MeetingProvider
      config={{
        meetingId: roomId ?? "",
        micEnabled: true,
        webcamEnabled: true,
        name: username,
        debugMode: false,
      }}
      token={authToken}
    >
      <MeetingView />
    </MeetingProvider>
  );
};

export default MeetingRoom;
