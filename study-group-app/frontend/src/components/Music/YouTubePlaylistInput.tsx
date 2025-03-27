import React, { useState, useEffect, useRef } from "react";

interface YouTubePlaylistInputProps {
  onSetPlaylistId: (playlistId: string) => void;
  playlistLink?: string; 
}

const YouTubePlaylistInput: React.FC<YouTubePlaylistInputProps> = ({ onSetPlaylistId, playlistLink }) => {
  const [inputUrl, setInputUrl] = useState("");
  const [currentPlaylistId, setCurrentPlaylistId] = useState("");
  const prevPlaylistIdRef = useRef<string>("");

  useEffect(() => {
    if (playlistLink) {
      setInputUrl(playlistLink);
      
      const playlistId = extractPlaylistId(playlistLink || "");
      if (playlistId && playlistId !== prevPlaylistIdRef.current) {
        setCurrentPlaylistId(playlistId);
        prevPlaylistIdRef.current = playlistId;
        onSetPlaylistId(playlistId);
      } else if (!playlistId) {
        alert("Invalid YouTube playlist URL.");
      }
    }
  }, [playlistLink]);

  const extractPlaylistId = (url: string) => {
    const match = url.match(/[?&]list=([^&]+)/);
    return match ? match[1] : "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const playlistId = extractPlaylistId(inputUrl);
    if (playlistId && playlistId !== prevPlaylistIdRef.current) {
      setCurrentPlaylistId(playlistId);
      prevPlaylistIdRef.current = playlistId;
      onSetPlaylistId(playlistId);
    } else if (!playlistId) {
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
