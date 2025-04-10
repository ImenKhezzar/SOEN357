import React, { useState, useEffect } from 'react';
import YouTubePlaylistInput from './YouTubePlaylistInput';
import YouTubePlaylistPlayer from './YouTubePlaylistPlayer';

interface MusicPlayerProps {
    playlistLink: string | undefined;
}

const MusicPlayerContainer: React.FC<MusicPlayerProps> = ({ playlistLink }) => {
    const [playlistId, setPlaylistId] = useState<string | undefined>(undefined);

    return (
        <div style={{ textAlign: "center", padding: "10px" }}>
            <YouTubePlaylistInput onSetPlaylistId={setPlaylistId} playlistLink={playlistLink} />
            <YouTubePlaylistPlayer playlistId={playlistId} showVideo={false} />
        </div>
    );
};

export default MusicPlayerContainer;
