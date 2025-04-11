import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Added useNavigate
import Auth from "../Authentication/Auth";
import myLogo from "../../assets/image.png";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div style={{ width: "100vw", position: "relative" }}>
      {/* Modal for Auth */}
      <Modal
        open={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur",
        }}
      >
        <Box
          sx={{
            borderRadius: "16px",
            boxShadow: 24,
            width: "50vw",
          }}
        >
          <Auth />
        </Box>
      </Modal>

      {/* Header */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img
              src={myLogo}
              alt="Logo"
              className="logo"
              style={{ height: "40px" }}
            />
          </Typography>
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Features
            </Button>
            <Button color="inherit" onClick={() => navigate("/about")}>
              About
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#927AF4" }}
              onClick={handleOpenAuthModal} // Open the Auth modal
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;