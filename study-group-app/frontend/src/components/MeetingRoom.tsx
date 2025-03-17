import { useParams } from "react-router-dom";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingView from "./MeetingView";
import { authToken } from "../API";

const MeetingRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <MeetingProvider
      config={{
        meetingId: roomId ?? "",
        micEnabled: true,
        webcamEnabled: true,
        name: "User",
        debugMode: false,
      }}
      token={authToken}
    >
      <MeetingView />
    </MeetingProvider>
  );
};

export default MeetingRoom;
