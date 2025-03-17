import React, { useState } from "react";
import YouTubePlaylistInput from "./YouTubePlaylistInput";
import YouTubePlaylistPlayer from "./YouTubePlaylistPlayer";


const MusicPlayerContainer: React.FC = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🎵 YouTube Playlist Player</h2>
      <YouTubePlaylistInput onSetPlaylistId={setPlaylistId} />
      {playlistId && <YouTubePlaylistPlayer playlistId={playlistId} showVideo={false} />}
    </div>
  );
};

export default MusicPlayerContainer;
