import "../App.css";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";

import React, { useState } from "react";

import TodoList from "../components/TodoList/TodoList";
import MusicPlayer from "../components/Music/MusicPlayer";
import PlaylistList from "../components/Music/PlaylistList"; // Import the PlaylistList component

import "../App.css";
const DashboardPage = () => {
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { auth } = authContext;
  const [currentPlaylistLink, setCurrentPlaylistLink] = useState<string | null>(
    null
  );

  const handlePlayPlaylist = (link: string) => {
    setCurrentPlaylistLink(link);
  };

  return (
    <div className="user-rect">
      <Sidebar />
      <div>
        <h1>Hi, {auth.username}</h1>
      </div>

      <div className="todo-list-container">
        <TodoList />
      </div>
      {/* <div className="playlist-list-container">
        <div
          className="white-box"
          style={{ width: "25%", maxWidth: "30vw", margin: "auto" }}
        >
          <PlaylistList onPlayPlaylist={handlePlayPlaylist} />
        </div>
      </div>
      <div className="music-player">
        <MusicPlayer playlistLink={currentPlaylistLink} />
      </div> */}
    </div>
  );
};

export default DashboardPage;
// className="dashboard-page"
