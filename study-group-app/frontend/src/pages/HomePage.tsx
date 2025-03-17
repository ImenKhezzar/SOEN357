import React from "react";
import Logout from "../components/Logout";
import TodoList from "../components/TodoList";
import StartStudying from "../components/StartStudying";
import Header from "../components/Header";

import "../App.css";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="homepage-container">
        <Logout />
        <TodoList />
        <StartStudying />
      </div>
    </div>
  );
};

export default HomePage;
