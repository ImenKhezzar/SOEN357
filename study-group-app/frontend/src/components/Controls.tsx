import { useMeeting } from "@videosdk.live/react-sdk";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Button, Stack } from "@mui/material";

export default function Controls() {
  const {
    toggleMic,
    toggleWebcam,
    toggleScreenShare,
    localMicOn,
    localWebcamOn,
  } = useMeeting();

  return (
    <Stack direction="row" spacing={2} sx={{ marginTop: "10px" }}>
    {/* Toggle Microphone */}
    <Button
      variant="contained"
      color={localMicOn ? "success" : "error"}
      startIcon={localMicOn ? <MicIcon /> : <MicOffIcon />}
      onClick={toggleMic}
    >
      {localMicOn ? "Mute" : "Unmute"}
    </Button>

    {/* Toggle Webcam */}
    <Button
      variant="contained"
      color={localWebcamOn ? "success" : "error"}
      startIcon={localWebcamOn ? <PhotoCameraIcon /> : <NoPhotographyIcon />}
      onClick={toggleWebcam}
    >
      {localWebcamOn ? "Turn Off Camera" : "Turn On Camera"}
    </Button>

  
    
    </Stack>
  );
}
