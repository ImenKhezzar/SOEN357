import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingView from "../components/MeetingView";
import { authToken } from "../API";
import useAuth from "../hooks/useAuth";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  CssBaseline,
  IconButton,
  ListItemIcon,
  styled,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TimerIcon from "@mui/icons-material/Timer";
import ListIcon from "@mui/icons-material/List";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import DraggableModal from "../components/DraggableDialogue/DraggableModal";
import TodoList from "../components/TodoList/TodoList";
import MusicPlayer from "../components/Music/MusicPlayer";
import PlaylistList from "../components/Music/PlaylistList";
import WhiteBoard from "../components/WhiteBoard";
import Timer from "../components/Timer/Timer";
import { useMeeting } from "@videosdk.live/react-sdk";
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // Import copy icon
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const MeetingRoom = () => {
  const [open, setOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true); // State to toggle playlist visibility
  const [currentPlaylistLink, setCurrentPlaylistLink] = useState<string | null>(
    null
  );
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

  const handleCopyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
    }
  };

  const backgrounds = [
    { name: "Gradient", url: "/background.jpg" },
    { name: "Street", url: "/street.jpg" },
    { name: "Desk", url: "/desk.jpg" },
    { name: "Cherry Blossom", url: "/Sakura.jpg" },
    { name: "Night View", url: "/nightview.jpg" },
    { name: "Christelle", url: "/christelle.jpg" },

    { name: "Amsterdam", url: "/Amsterdam.jpg" },
    { name: "Sunset", url: "/sunset.jpg" },
    { name: "Camping", url: "/camping.jpg" },
    { name: "Lake", url: "/Lake.jpg" },
    { name: "Rain", url: "/Rain.jpg" },
  ];

  const [background, setBackground] = useState("/background.jpg");

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "0",
        height: "100vh",
        width: "100vw",
        marginTop: "-20px",
      }}
    >
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
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            height: "auto",
          },
        }}
      >
        <DrawerHeader>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>
              Meeting ID: <br /> {roomId}
            </span>
            <Tooltip title="Copy Meeting ID">
              <IconButton onClick={handleCopyRoomId} size="small">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
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
          <Divider />
          <ListItem>
            <ListItemIcon>
              <WallpaperIcon />
            </ListItemIcon>

            <div>
              <select
                onChange={(e) => setBackground(e.target.value)}
                value={background}
                style={{
                  padding: "0",
                  fontSize: "15px",
                  width: "150px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "none",
                  color: "rgb(0,0,0)",
                }}
              >
                {backgrounds.map((bg) => (
                  <option key={bg.name} value={bg.url}>
                    {bg.name}
                  </option>
                ))}
              </select>
            </div>
          </ListItem>
          <Divider />
          {/* <ListItem button onClick={handleWhiteBoardOpen}>
            <ListItemIcon>
              <WhiteBoard />
            </ListItemIcon>
            <ListItemText primary="Whiteboard" />
          </ListItem> */}
          <Divider />
        </List>
      </Drawer>

      <div style={{ marginTop: "1%" }}>
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
      </div>

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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={togglePlaylistVisibility}
            className="submit-button"
            style={{ padding: "0px" }}
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
      <DraggableModal open={timerOpen} onClose={handleTimerClose} title=" ">
        <Timer />
      </DraggableModal>
    </div>
  );
};

export default MeetingRoom;
