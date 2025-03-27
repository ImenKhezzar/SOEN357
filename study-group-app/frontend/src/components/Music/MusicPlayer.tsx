import React, { useState, useEffect } from 'react';
import YouTubePlaylistInput from './YouTubePlaylistInput';
import YouTubePlaylistPlayer from './YouTubePlaylistPlayer';

interface MusicPlayerProps {
    playlistLink: string | undefined;
}

const MusicPlayerContainer: React.FC<MusicPlayerProps> = ({ playlistLink }) => {
    const [playlistId, setPlaylistId] = useState<string | undefined>(undefined);

    return (
        <div className="music-player" style={{ textAlign: "center", padding: "20px" }}>
            <h2>🎵 YouTube Playlist Player</h2>
            <YouTubePlaylistInput onSetPlaylistId={setPlaylistId} playlistLink={playlistLink} />
            {playlistId && <YouTubePlaylistPlayer playlistId={playlistId} showVideo={false} />}
        </div>
    );
};

export default MusicPlayerContainer;
