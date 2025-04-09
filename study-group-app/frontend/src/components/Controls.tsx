import { useMeeting } from "@videosdk.live/react-sdk";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { IconButton, Stack } from "@mui/material";
import WhiteBoard from "./WhiteBoard";
import "../App.css";
import { useEffect } from "react";

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

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const audioTracks = stream.getAudioTracks();
    console.log("Got audio tracks: ", audioTracks);
  });

  const meeting = useMeeting();

  console.log(meeting);

  return (
    <Stack direction="row" spacing={2} sx={{ marginTop: "10px" }}>
      <IconButton variant="contained" onClick={() => toggleMic()}>
        {localMicOn ? <MicIcon /> : <MicOffIcon />}
      </IconButton>

      <IconButton
        variant="contained"
        size="medium"
        onClick={() => toggleWebcam()}
      >
        {localWebcamOn ? <PhotoCameraIcon /> : <NoPhotographyIcon />}
      </IconButton>

      <IconButton
        variant="contained"
        size="medium"
        onClick={() => toggleScreenShare()}
      >
        {localScreenShareOn ? <CancelPresentationIcon /> : <PresentToAllIcon />}
      </IconButton>

      <WhiteBoard />

      <IconButton variant="contained" size="medium" onClick={handleLeave}>
        <CallEndIcon />
      </IconButton>
    </Stack>
  );
};

export default Controls;
