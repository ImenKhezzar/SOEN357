import React, { useState } from 'react';
import Logout from '../components/Authentication/Logout';
import TodoList from '../components/TodoList/TodoList';
import MusicPlayer from '../components/Music/MusicPlayer';
import PlaylistList from '../components/Music/PlaylistList'; // Import the PlaylistList component
import '../App.css'; 

const HomePage = () => {
    const [currentPlaylistLink, setCurrentPlaylistLink] = useState<string | null>(null);

    const handlePlayPlaylist = (link: string) => {
        setCurrentPlaylistLink(link);
    };

    return (
        <div className="homepage-container">
            <Logout />
            <TodoList />
            <PlaylistList onPlayPlaylist={handlePlayPlaylist} /> 
            <MusicPlayer playlistLink={currentPlaylistLink} /> 
        </div>
    );
};

export default HomePage;
