import React from "react";
import myLogo from "../assets/image.png"; // Adjust the path if needed

export default function Header() {
  return (
    <img src={myLogo} alt="My Image" className="logo" />
  );
}
