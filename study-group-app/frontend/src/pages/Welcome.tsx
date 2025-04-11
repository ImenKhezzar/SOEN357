import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import myLogo from "../assets/image.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link, Modal, IconButton } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaUserCircle, FaListAlt, FaMusic } from "react-icons/fa"; // Replaced icons
import { Container, Row, Col } from 'react-bootstrap'; // Replaced Grid2 with react-bootstrap
import Auth from "../components/Authentication/Auth";

const Welcome = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const cards = [
    {
      id: 1,
      title: "Personal Room",
      description:
        "Your private study space with all the tools you need to stay focused.",
      icon: <FaUserCircle style={{ fontSize: "30px", color: "#78CFEB" }} />,
    },
    {
      id: 2,
      title: "Smart To-do List",
      description:
        "Keep track of your tasks and study goals with our intuitive todo list.",
      icon: <FaListAlt style={{ fontSize: "30px", color: "#)EAA42" }} />,
    },
    {
      id: 3,
      title: "Music",
      description:
        "Access curated playlist and YouTube player for better concentration.",
      icon: <FaMusic style={{ fontSize: "30px", color: "#7C3AED" }} />,
    },
  ];

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
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
      <div className="header" style={{ width: "100vw" }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: "white" }}>
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
              <Button color="inherit">Features</Button>
              <Button color="inherit">Rooms</Button>
              <Button color="inherit">About</Button>
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

      {/* FRIST BLOCK */}
      <div
        className="first-block"
        style={{
          background: "linear-gradient(90deg, #F7EEFF 0%, #F3F9FF 100%)",
          width: "100vw",
          height: "383px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack className="content" direction="column" spacing={7}>
          <h1 className="slogan" style={{ paddingTop: "30px" }}>
            Study Together, <span style={{ color: "#927AF4" }}>Anywhere</span>
          </h1>
          <h3>
            Join our virtual study rooms to stay focused organized, and
            connected <br />
            with fellow students worldwide.
          </h3>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="contained" sx={{ backgroundColor: "#927AF4" }}>
              Create Room
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#927AF4", borderColor: "#927AF4" }}
            >
              Join Room
            </Button>
          </Stack>
        </Stack>
      </div>

      {/* SECOND BLOCK */}
      <div
        className="second-block"
        style={{
          height: "328px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          width: "100vw",
        }}
      >
<div style={{
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px', 
  justifyContent: 'center' ,
  padding: '5em'
}}>
  {cards.map((card, index) => (
    <div key={index} style={{
      flex: '1 1 calc(33.333% - 16px)', // 3 columns accounting for gap
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <Card style={{ height: '100%' }}>
        <CardContent>
          {card.icon}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontWeight: "bold" }}
          >
            {card.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {card.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  ))}
</div>
      </div>

      {/* THIRD BLOCK */}
      <div
        className="third-block"
        style={{
          height: "370px",
          backgroundColor: "#F9FAFB",
          width: "100vw",
        }}
      >
        <Stack
          className="content"
          direction="column"
          spacing={7}
          style={{ marginTop: "30px" }}
        >
          <Stack
            className="block2-text"
            direction="column"
            spacing={7}
            alignItems="center"
          >
            <h2>Experience Focused Study Sessions</h2>
            <h4 style={{ textAlign: "center" }}>
              Join or create study rooms with built-in features designed to
              enhance <br />
              your study experience.
            </h4>
          </Stack>

          <div
            className="check-list"
            style={{ width: "30vw", margin: "0 auto", marginTop: "20px" }}
          >
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: "0",
                width: "100%",
              }}
            >
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "25px",
                }}
              >
                <Typography component="span" sx={{ marginRight: "10px" }}>✓</Typography>
                Collaborative study environment
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "25px",
                }}
              >
                <Typography component="span" sx={{ marginRight: "10px" }}>✓</Typography>
                Integrated YouTube player for educational content
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "25px",
                }}
              >
                <Typography component="span" sx={{ marginRight: "10px" }}>✓</Typography>
                Customizable study music playlists
              </li>
            </ul>
          </div>
        </Stack>
      </div>
      {/* FOURTH BLOCK */}
      <div
        className="fourth-block"
        style={{
          height: "316px",
          backgroundColor: "#927AF4",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          className="content"
          direction="column"
          spacing={4}
          sx={{ alignItems: "center" }}
        >
          <h1
            className="slogan"
            style={{
              paddingTop: "30px",
              color: "#FFFFFF",
            }}
          >
            Ready to Start Studying?
          </h1>
          <h3
            style={{
              paddingTop: "30px",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Join thousands of students who are already using StudyRoom to
            improve their
            <br />
            study habits.
          </h3>

          <Button
            variant="contained"
            sx={{
              color: "#927AF4",
              borderColor: "#927AF4",
              backgroundColor: "#FFFFFF",
              maxWidth: "250px",
            }}
          >
            Get Started For Free
          </Button>
        </Stack>
      </div>

       {/* FOOTER */}
<div 
  className="footer" 
  style={{ 
    backgroundColor: "#111827",
    padding: "60px",
    width: "100vw"
  }}
>
  <Container>
    {/* Main Footer Content */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "40px",
      marginBottom: "40px"
    }}>
      {/* Product Column */}
      <div>
        <Typography variant="h6" gutterBottom style={{ color: "white", fontWeight: 600 }}>
          Product
        </Typography>
        <Stack spacing={1}>
          {['Features', 'Pricing', 'Updates'].map((item) => (
            <Link 
              key={item}
              href="#" 
              color="inherit" 
              underline="none"
              sx={{ color: "#9CA3AF", '&:hover': { color: "white" } }}
            >
              {item}
            </Link>
          ))}
        </Stack>
      </div>

      {/* Company Column */}
      <div>
        <Typography variant="h6" gutterBottom style={{ color: "white", fontWeight: 600 }}>
          Company
        </Typography>
        <Stack spacing={1}>
          {['About Us', 'Careers', 'Blog'].map((item) => (
            <Link 
              key={item}
              href="#" 
              color="inherit" 
              underline="none"
              sx={{ color: "#9CA3AF", '&:hover': { color: "white" } }}
            >
              {item}
            </Link>
          ))}
        </Stack>
      </div>

      {/* Support Column */}
      <div>
        <Typography variant="h6" gutterBottom style={{ color: "white", fontWeight: 600 }}>
          Support
        </Typography>
        <Stack spacing={1}>
          {['Help Center', 'Contact Us', 'Terms'].map((item) => (
            <Link 
              key={item}
              href="#" 
              color="inherit" 
              underline="none"
              sx={{ color: "#9CA3AF", '&:hover': { color: "white" } }}
            >
              {item}
            </Link>
          ))}
        </Stack>
      </div>

      {/* Connect Column */}
      <div>
        <Typography variant="h6" gutterBottom style={{ color: "white", fontWeight: 600 }}>
          Connect
        </Typography>
        <Stack direction="row" spacing={2}>
          <IconButton 
            href="https://facebook.com" 
            target="_blank"
            sx={{ color: "#9CA3AF", '&:hover': { color: "#3b5998" } }}
          >
            <FaFacebook />
          </IconButton>
          <IconButton 
            href="https://twitter.com" 
            target="_blank"
            sx={{ color: "#9CA3AF", '&:hover': { color: "#1da1f2" } }}
          >
            <FaTwitter />
          </IconButton>
          <IconButton 
            href="https://instagram.com" 
            target="_blank"
            sx={{ color: "#9CA3AF", '&:hover': { color: "#e1306c" } }}
          >
            <FaInstagram />
          </IconButton>
        </Stack>
      </div>
    </div>
  </Container>
</div>
      </div>
  );
};

export default Welcome;
