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

  // Audio
  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch(console.error);
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micOn, micStream]);

  // Webcam
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

  // Screen share
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
    <>
      <audio ref={micRef} autoPlay muted={isLocal} />

      {screenShareOn && (
        <div
          className="screen-share-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "70vw",
            height: "80vh",

            zIndex: 1,
          }}
        >
          <video
            ref={screenShareRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      )}

      <div
        className="participant-box"
        style={{
          position: "relative",
          top: "12px",
          left: "70vw",
          width: "200px",
          height: "150px",
          borderRadius: "12px",
          backgroundColor: "#000",
          overflow: "hidden",
          zIndex: 2,

          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {webcamOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scaleX(-1)",
            }}
          />
        ) : (
          <p style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
            {displayName}
          </p>
        )}
      </div>
    </>
  );
};

export default ParticipantView;
