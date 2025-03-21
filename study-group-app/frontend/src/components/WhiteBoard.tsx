import { useWhiteboard } from "@videosdk.live/react-sdk";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Button from "@mui/material/Button";

export default function WhiteBoard() {
  const { startWhiteboard, stopWhiteboard, whiteboardUrl } = useWhiteboard();

  return (
    <div>
      {!whiteboardUrl ? (
        <Button startIcon={<StickyNote2Icon />} onClick={startWhiteboard} />
       
      ) : (
        <>
          <Button startIcon={<StickyNote2Icon />} onClick={stopWhiteboard} />
           
          <iframe src={whiteboardUrl} width="800" height="600"></iframe>
        </>
      )}
    </div>
  );
}
