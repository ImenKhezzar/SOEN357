import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";
import "../App.css";

const ParticipantView = ({ participantId }: { participantId: string }) => {
  const {
    displayName,
    micOn,
    webcamOn,
    webcamStream,
    screenShareOn,
    screenShareStream,
  } = useParticipant(participantId);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const screenShareRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    if (screenShareRef.current) {
      if (screenShareOn && screenShareStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(screenShareStream.track);
        screenShareRef.current.srcObject = mediaStream;
      } else {
        screenShareRef.current.srcObject = null;
      }
    }
  }, [screenShareStream, screenShareOn]);

  return (
    <div className="participant-view">
      <p>Participant: {displayName}</p>
      <p>Mic Status: {micOn ? "On" : "Off"}</p>
      {webcamOn ? (
        <video
          className="participant-view-video"
          ref={videoRef}
          autoPlay
          playsInline
          width="200"
          height="150"
        />
      ) : (
        <p>Webcam Off</p>
      )}

      {screenShareOn ? (
        <div className="screen-share-container">
          <p>Screen Sharing</p>
          <video
            className="screen-share-video"
            ref={screenShareRef}
            autoPlay
            playsInline
          />
        </div>
      ) : null}
    </div>
  );
};

export default ParticipantView;
