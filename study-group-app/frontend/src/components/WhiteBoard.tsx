import { useWhiteboard } from "@videosdk.live/react-sdk";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Button from "@mui/material/Button";
import DraggableModal from "./DraggableDialogue/DraggableModal";

export default function WhiteBoard() {
  const { startWhiteboard, stopWhiteboard, whiteboardUrl } = useWhiteboard();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      {!whiteboardUrl ? (
        <Button
          variant="contained"
          startIcon={<StickyNote2Icon />}
          onClick={startWhiteboard}
        >
         Whiteboard
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            startIcon={<StickyNote2Icon />}
            onClick={stopWhiteboard}
          >
            Whiteboard
          </Button>
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
