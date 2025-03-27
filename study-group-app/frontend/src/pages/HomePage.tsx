import React, { useState } from 'react';
import Logout from '../components/Authentication/Logout';
import TodoList from '../components/TodoList/TodoList';
import MusicPlayer from '../components/Music/MusicPlayer';
import PlaylistList from '../components/Music/PlaylistList'; // Import the PlaylistList component
import StartStudying from "../components/StartStudying";
import Header from "../components/Header";

import "../App.css";

const HomePage = () => {
    const [currentPlaylistLink, setCurrentPlaylistLink] = useState<string | null>(null);

    const handlePlayPlaylist = (link: string) => {
        setCurrentPlaylistLink(link);
    };

    return (
        <div>
            <Header />
            <div className="homepage-container">
                <Logout />
                <StartStudying />
                <TodoList />
                <PlaylistList onPlayPlaylist={handlePlayPlaylist} /> 
                <MusicPlayer playlistLink={currentPlaylistLink} /> 
            </div>
        </div>
    );
};

export default HomePage;
