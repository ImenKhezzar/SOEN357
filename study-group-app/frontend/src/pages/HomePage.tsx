import React from 'react';
import Logout from '../components/Authentication/Logout';
import TodoList from '../components/TodoList/TodoList';
import MusicPlayerContainer from '../components/Music/MusicPlayer';
import '../App.css'; 

const HomePage = () => {
   
    return (
        <div className="homepage-container">
            <Logout/>
            <TodoList />
            <MusicPlayerContainer />
        </div>
    );
};

export default HomePage;