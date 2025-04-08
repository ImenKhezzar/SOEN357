import { useMeeting } from "@videosdk.live/react-sdk";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Button, Stack } from "@mui/material";
import WhiteBoard from "./WhiteBoard";
import "../App.css";

interface ControlsProps {
  handleLeave: () => void;
  handleEndMeeting: () => void;
}

const Controls: React.FC<ControlsProps> = ({ handleLeave }) => {
  const {
    toggleMic,
    toggleWebcam,
    toggleScreenShare,
    localMicOn,
    localWebcamOn,
    localScreenShareOn,
  } = useMeeting();

  const meeting = useMeeting();

  console.log(meeting);

  return (
    <Stack direction="row" spacing={2} sx={{ marginTop: "10px" }}>
      {/* Toggle Microphone */}
      <Button
        variant="contained"
        startIcon={localMicOn ? <MicIcon /> : <MicOffIcon />}
        onClick={() => toggleMic()}
      />

      {/* Toggle Webcam */}
      <Button
        variant="contained"
        startIcon={localWebcamOn ? <PhotoCameraIcon /> : <NoPhotographyIcon />}
        onClick={() => toggleWebcam()}
      />

      <Button
        variant="contained"
        startIcon={
          localScreenShareOn ? <CancelPresentationIcon /> : <PresentToAllIcon />
        }
        onClick={() => toggleScreenShare()}
      />

      <WhiteBoard />

      <Button variant="contained" onClick={handleLeave}>
        Leave Meeting
      </Button>
    </Stack>
  );
};

export default Controls;
