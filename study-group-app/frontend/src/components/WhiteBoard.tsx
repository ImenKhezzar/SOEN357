import { useWhiteboard } from "@videosdk.live/react-sdk";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import {IconButton} from "@mui/material";
import DraggableModal from "./DraggableDialogue/DraggableModal";

export default function WhiteBoard() {
  const { startWhiteboard, stopWhiteboard, whiteboardUrl } = useWhiteboard();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {!whiteboardUrl ? (
        <IconButton variant="contained" size="medium" onClick={startWhiteboard}>
          <StickyNote2Icon />
        </IconButton>
      ) : (
        <>
          <IconButton variant="contained" size="medium" onClick={stopWhiteboard}>
            <StickyNote2Icon />
          </IconButton>
          <DraggableModal
            open={startWhiteboard}
            onClose={stopWhiteboard}
            title="WhiteBoard"
          >
            <iframe
              src={whiteboardUrl}
              width="800"
              height="600"
              style={{ border: "1px solid #ccc", borderRadius: "8px" }}
              title="Whiteboard"
            ></iframe>
          </DraggableModal>
        </>
      )}
    </div>
  );
}
