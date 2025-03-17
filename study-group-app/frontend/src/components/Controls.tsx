import { useMeeting } from "@videosdk.live/react-sdk";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
 
 export default function Controls() {
  const { toggleMic, toggleWebcam, toggleScreenShare } = useMeeting();
  return (
    <div>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      <button onClick={() => toggleScreenShare()}> toggleScreenShare</button>
    </div>
  );
}