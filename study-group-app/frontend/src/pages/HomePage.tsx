import React from 'react';
import Logout from '../components/Logout';
import TodoList from '../components/ToDoList';
import '../App.css'; 

const HomePage = () => {
   
    return (
        <div className="homepage-container">
            <Logout/>
            <TodoList />
        </div>
    );
};

export default HomePage;