import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";

const ParticipantView = ({ participantId }: { participantId: string }) => {
  const { displayName, micOn, webcamOn, webcamStream } =
    useParticipant(participantId);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);

        videoRef.current.srcObject = mediaStream;
        videoRef.current
          .play()
          .catch((error) => console.error("Video play failed:", error));
      } else {
        videoRef.current.srcObject = null;
      }
    }
  }, [webcamOn, webcamStream]);

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
      <p>Participant: {displayName}</p>
      <p>Mic Status: {micOn ? "On" : "Off"}</p>
      {webcamOn ? (
        <video ref={videoRef} autoPlay playsInline width="200" height="150" />
      ) : (
        <p>Webcam Off</p>
      )}
    </div>
  );
};

export default ParticipantView;
