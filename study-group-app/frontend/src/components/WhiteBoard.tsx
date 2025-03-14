import { useWhiteboard } from "@videosdk.live/react-sdk";

export default function WhiteBoard() {
  const { startWhiteboard, stopWhiteboard, whiteboardUrl } = useWhiteboard();

  return (
    <div>
      {!whiteboardUrl ? (
        <button onClick={startWhiteboard}>Start Whiteboard</button>
      ) : (
        <>
          <button onClick={stopWhiteboard}>Stop Whiteboard</button>
          <iframe src={whiteboardUrl} width="800" height="600"></iframe>
        </>
      )}
    </div>
  );
}
