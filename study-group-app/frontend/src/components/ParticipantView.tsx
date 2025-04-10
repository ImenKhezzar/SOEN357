import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";


const ParticipantView = ({ participantId }: { participantId: string }) => {
  const {
    displayName,
    webcamOn,
    webcamStream,
    screenShareOn,
    screenShareStream,
    micOn,
    micStream,
    isLocal,
  } = useParticipant(participantId);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const screenShareRef = useRef<HTMLVideoElement | null>(null);
  const micRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch((error) => {
          console.error("micRef.current.play() failed", error);
        });
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micOn, micStream]);

  useEffect(() => {
    if (videoRef.current) {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(console.error);
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
  }, [screenShareOn, screenShareStream]);

  return (
    <div
      className="participant-wrapper"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {screenShareOn && (
        <div
          className="screen-share-container"
          style={{ width: "80%", height: "80%" }}
        >
          <video
            className="screen-share-video"
            ref={screenShareRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      )}

      {webcamOn && (
        <div
          className="webcam-video-container"
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "200px",
            height: "150px",
            backgroundColor: "#000",
            borderRadius: "8px",

            overflow: "hidden",
            zIndex: 10,
          }}
        >
          <audio ref={micRef} autoPlay muted={isLocal} />

          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: " scaleX(-1)",
              top:"20px",
            }}
          />
        </div>
      )}

      {!webcamOn && !screenShareOn && (
        <div className="participant-placeholder">
          <p>{displayName}</p>
        </div>
      )}
    </div>
  );
};

export default ParticipantView;
