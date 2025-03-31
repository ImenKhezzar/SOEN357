import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingView from "../components/MeetingView";
import { authToken } from "../API";
import useAuth from "../hooks/useAuth";
import { Drawer, List, ListItem, ListItemText, Divider, CssBaseline, IconButton, ListItemIcon, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TimerIcon from "@mui/icons-material/Timer";
import ListIcon from "@mui/icons-material/List";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import WhiteboardIcon from "@mui/icons-material/BorderColor";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import DraggableModal from "../components/DraggableDialogue/DraggableModal"; // Import the reusable modal
import TodoList from "../components/TodoList/TodoList"; // Import your TodoList component

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MeetingRoom = () => {
  const [open, setOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);
  const { roomId } = useParams<{ roomId: string }>();
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { auth } = authContext;
  const username = auth.username;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTodoOpen = () => {
    setTodoOpen(true);
  };

  const handleTodoClose = () => {
    setTodoOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        style={{ position: "absolute", top: 0, left: 0, margin: "16px" }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", height: "auto" },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText primary="Timer" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleTodoOpen}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="To-do List" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <MusicNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Music" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <WallpaperIcon />
            </ListItemIcon>
            <ListItemText primary="Background" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <WhiteboardIcon />
            </ListItemIcon>
            <ListItemText primary="Whiteboard" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <ScreenShareIcon />
            </ListItemIcon>
            <ListItemText primary="ScreenShare" />
          </ListItem>
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: "24px", marginTop: "64px" }}>
        <MeetingProvider
          config={{
            meetingId: roomId ?? "",
            micEnabled: true,
            webcamEnabled: true,
            name: username,
            debugMode: false,
          }}
          token={authToken}
        >
          <MeetingView />
        </MeetingProvider>
      </main>
      {/* Reusable DraggableModal with TodoList */}
      <DraggableModal
        open={todoOpen}
        onClose={handleTodoClose}
        title="To-do List"
      >
        <TodoList /> {/* Pass TodoList as children */}
      </DraggableModal>
    </div>
  );
};

export default MeetingRoom;