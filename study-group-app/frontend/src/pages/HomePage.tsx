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
                <div className="todo-list-container">
                    <div className="white-box" style={{ width: '100%', maxHeight: '30vw', margin: 'auto' }}> 
                    <TodoList />
                    </div>
                </div>
                <div className='playlist-list-container'>
                    <div className="white-box" style={{ width: '100%', maxWidth: '30vw', margin: 'auto' }}>
                        <PlaylistList onPlayPlaylist={handlePlayPlaylist} /> 
                    </div>
                </div>
                <div className="music-player">
                    <MusicPlayer playlistLink={currentPlaylistLink} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
