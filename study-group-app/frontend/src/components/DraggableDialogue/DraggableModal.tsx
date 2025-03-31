import React from "react";
import { Modal, Paper, IconButton, DialogTitle, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Draggable from "react-draggable";

const PaperComponent = (props: any) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

interface DraggableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const DraggableModal: React.FC<DraggableModalProps> = ({ open, onClose, title, children }) => {
  const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    // Prevent closing on backdrop click or escape key press
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose} // Use the custom handleClose function
      aria-labelledby="draggable-dialog-title"
      components={{
        Backdrop: () => null, // Remove the backdrop entirely
      }}
      sx={{
        pointerEvents: "none", // Disable pointer events for the modal container
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none", // Remove focus outline
          pointerEvents: "auto", // Re-enable pointer events for the dialog content
        }}
      >
        <PaperComponent>
          <DialogTitle
            style={{ cursor: 'move', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            id="draggable-dialog-title"
          >
            {title}
            <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
        </PaperComponent>
      </div>
    </Modal>
  );
};

export default DraggableModal;