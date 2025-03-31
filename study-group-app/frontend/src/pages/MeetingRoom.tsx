import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingView from "../components/MeetingView";
import { authToken } from "../API";
import useAuth from "../hooks/useAuth";
import { Drawer, List, ListItem, ListItemText, Divider, CssBaseline, IconButton, ListItemIcon, styled, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TimerIcon from "@mui/icons-material/Timer";
import ListIcon from "@mui/icons-material/List";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import WhiteboardIcon from "@mui/icons-material/BorderColor";
import DraggableModal from "../components/DraggableDialogue/DraggableModal";
import TodoList from "../components/TodoList/TodoList";
import MusicPlayer from "../components/Music/MusicPlayer";
import PlaylistList from "../components/Music/PlaylistList";
import WhiteBoard from "../components/WhiteBoard";
import Timer from "../components/Timer/Timer";
import { useMeeting } from "@videosdk.live/react-sdk";

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
  const [musicOpen, setMusicOpen] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true); // State to toggle playlist visibility
  const [currentPlaylistLink, setCurrentPlaylistLink] = useState<string | null>(null);
  const [whiteBoardOpen, setWhiteBoardOpen] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);

  const { roomId } = useParams<{ roomId: string }>();
  const authContext = useAuth();

  const meeting = useMeeting();

  console.log(meeting);

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

  const handleMusicOpen = () => {
    setMusicOpen(true);
  };

  const handleMusicClose = () => {
    setMusicOpen(false);
  };

  const handlePlayPlaylist = (link: string) => {
    setCurrentPlaylistLink(link);
  };

  const togglePlaylistVisibility = () => {
    setShowPlaylist((prev) => !prev);
  };

  const handleWhiteBoardOpen = () => {
    setWhiteBoardOpen(true);
  };

  const handleWhiteBoardClose = () => {
    setWhiteBoardOpen(false);
  };

  const handleTimerOpen = () => {
    setTimerOpen(true);
  };

  const handleTimerClose = () => {
    setTimerOpen(false);
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
          <ListItem button onClick={handleTimerOpen}>
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
          <ListItem button onClick={handleMusicOpen}>
            <ListItemIcon>
              <MusicNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Music" />
          </ListItem>
          {/* <Divider />
          <ListItem button>
            <ListItemIcon>
              <WallpaperIcon />
            </ListItemIcon>
            <ListItemText primary="Background" />
          </ListItem> */}
          {/* <Divider />
          <ListItem button onClick={handleWhiteBoardOpen}>
            <ListItemIcon>
              <WhiteboardIcon />
            </ListItemIcon>
            <ListItemText primary="Whiteboard" />
          </ListItem> */}
          <Divider />
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

      {/* TodoList */}
      <DraggableModal
        open={todoOpen}
        onClose={handleTodoClose}
        title="To-do List"
      >
        <TodoList />
      </DraggableModal>

      {/* Music Player */}
      <DraggableModal
        open={musicOpen}
        onClose={handleMusicClose}
        title="Music Player"
      >
        {showPlaylist && <PlaylistList onPlayPlaylist={handlePlayPlaylist} />}
        <MusicPlayer playlistLink={currentPlaylistLink} />
        <div style={{ display: "flex", justifyContent: "center"}}>
          <Button
          variant="contained"
          onClick={togglePlaylistVisibility}
          className="submit-button"
          style={{ padding: "0px",  }}
        >
          {showPlaylist ? "Hide Playlist" : "Show Playlist"}
        </Button>
        </div>
      </DraggableModal>

      {/* Whitebord */}
      <DraggableModal
        open={whiteBoardOpen}
        onClose={handleWhiteBoardClose}
        title="WhiteBoard"
      >
        <WhiteBoard />
      </DraggableModal>

      {/* Timer */}
      <DraggableModal
        open={timerOpen}
        onClose={handleTimerClose}
        title="Pomodoro Timer"
      >
        <Timer />
      </DraggableModal>
    </div>
  );
};

export default MeetingRoom;