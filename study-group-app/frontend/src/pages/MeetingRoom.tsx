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
import { Select, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';

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
    { name: "Desk 1", url: "/desk.jpg" },
    { name: "Cherry Blossom", url: "/Sakura.jpg" },

    { name: "Dark", url: "/dark.jpg" },
    { name: "Desk 2", url: "/desk2.jpg" },
    { name: "Desk 3", url: "/desk3.jpg" },
    { name: "Desk 4", url: "/desk4.jpg" },
    { name: "Rainy Desk", url: "/rainyDesk.jpg" },
    { name: "Flowers", url: "/flowers.jpg" },
    { name: "Sand", url: "/sand.jpg" },

    
   
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
      backgroundColor: "#f8f9fa", // Light gray background
      borderRight: "1px solid #e0e0e0", // Subtle border
    },
  }}
>
  {/* Drawer Header */}
  <DrawerHeader sx={{ 
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    backgroundColor: "#ffffff", 
    borderBottom: "1px solid #e0e0e0" 
  }}>
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "8px",
      backgroundColor: "#f3f9ff",
      padding: "8px 12px",
      borderRadius: "8px"
    }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
        Meeting ID: {roomId}
      </Typography>
      <Tooltip title="Copy Meeting ID">
        <IconButton 
          onClick={handleCopyRoomId} 
          size="small"
          sx={{ 
            color: "#927af4",
            '&:hover': { backgroundColor: "rgba(0, 0, 0, 0.04)" }
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
    <IconButton 
      onClick={handleDrawerClose}
      sx={{
        color: "text.secondary",
        '&:hover': { backgroundColor: "rgba(0, 0, 0, 0.04)" }
      }}
    >
      <ChevronLeftIcon />
    </IconButton>
  </DrawerHeader>

  {/* Menu Items */}
  <List sx={{ padding: "8px", backgroundColor: "#f3f9ff" }}>
    {/* Timer */}
    <ListItem 
      button 
      onClick={handleTimerOpen}
      sx={{
        borderRadius: "8px",
        margin: "4px 0",
        '&:hover': { backgroundColor: "rgba(0, 0, 0, 0.04)" }
      }}
    >
      <ListItemIcon sx={{ minWidth: "40px" }}>
        <TimerIcon style={{ color:'#927af4'}}/>
      </ListItemIcon>
      <ListItemText 
        primary="Timer" 
        primaryTypographyProps={{ fontWeight: 500 }}
      />
    </ListItem>
    <Divider sx={{ my: 1 }} />

    {/* To-do List */}
    <ListItem 
      button 
      onClick={handleTodoOpen}
      sx={{
        borderRadius: "8px",
        margin: "4px 0",
        '&:hover': { backgroundColor: "rgba(0, 0, 0, 0.04)" }
      }}
    >
      <ListItemIcon sx={{ minWidth: "40px" }}>
        <ListIcon style={{ color:'#927af4'}} />
      </ListItemIcon>
      <ListItemText 
        primary="To-do List" 
        primaryTypographyProps={{ fontWeight: 500 }}
      />
    </ListItem>
    <Divider sx={{ my: 1 }} />

    {/* Music */}
    <ListItem 
      button 
      onClick={handleMusicOpen}
      sx={{
        borderRadius: "8px",
        margin: "4px 0",
        '&:hover': { backgroundColor: "rgba(0, 0, 0, 0.04)" }
      }}
    >
      <ListItemIcon sx={{ minWidth: "40px" }}>
        <MusicNoteIcon style={{ color:'#927af4'}} />
      </ListItemIcon>
      <ListItemText 
        primary="Music" 
        primaryTypographyProps={{ fontWeight: 500 }}
      />
    </ListItem>
    <Divider sx={{ my: 1 }} />

    {/* Background Selector */}
    <ListItem sx={{ padding: "8px 16px" }}>
      <ListItemIcon sx={{ minWidth: "40px" }}>
        <WallpaperIcon style={{ color:'#927af4'}} />
      </ListItemIcon>
      <Select
        value={background}
        onChange={(e) => setBackground(e.target.value)}
        size="small"
        fullWidth
        sx={{
          borderRadius: "8px",
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "divider"
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: "primary.main"
          }
        }}
      >
        {backgrounds.map((bg) => (
          <MenuItem key={bg.name} value={bg.url}>
            <Typography variant="body2">{bg.name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </ListItem>
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
        <div style={{ maxWidth: "200px" }}>
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
        </div>
      </DraggableModal>
      

      {/* Whiteboard */}

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
