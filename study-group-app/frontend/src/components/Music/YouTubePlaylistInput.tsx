import React, { useState } from "react";

interface YouTubePlaylistInputProps {
  onSetPlaylistId: (playlistId: string) => void;
}

const YouTubePlaylistInput: React.FC<YouTubePlaylistInputProps> = ({ onSetPlaylistId }) => {
  const [inputUrl, setInputUrl] = useState("");

  const extractPlaylistId = (url: string) => {
    const match = url.match(/[?&]list=([^&]+)/);
    return match ? match[1] : "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const playlistId = extractPlaylistId(inputUrl);
    if (playlistId) {
      onSetPlaylistId(playlistId);
    } else {
      alert("Invalid YouTube playlist URL.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter YouTube Playlist URL"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        required
      />
      <button type="submit">Load Playlist</button>
    </form>
  );
};

export default YouTubePlaylistInput;
