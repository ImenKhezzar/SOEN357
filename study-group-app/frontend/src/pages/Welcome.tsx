import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import myLogo from "../assets/image.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Welcome = () => {
  const cards = [
    {
      id: 1,
      title: "Personal Room",
      description:
        "Your private study space with all the tools you need to stay focused.",
    },
    {
      id: 2,
      title: "Smart To-do List",
      description:
        "Keep track of your tasks and study goals with our intuitive todo list.",
    },
    {
      id: 3,
      title: "Study Room",
      description:
        "Access curated playlist and YouTube player for better concentration.",
    },
  ];

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div className="header" style={{ width: "100vw" }}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <img
                src={myLogo}
                alt="My Image"
                className="logo"
                style={{ height: "40px" }}
              />
            </Typography>
            <Box sx={{ display: "flex", gap: "12px" }}>
              <Button color="inherit">Features</Button>
              <Button color="inherit">Rooms</Button>
              <Button color="inherit">About</Button>
              <Button variant="contained" sx={{ backgroundColor: "#927AF4" }}>
                Get Started
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </div>

      <div
        className="first-block"
        style={{
          background: "linear-gradient(90deg, #F7EEFF 0%, #F3F9FF 100%)",
          width: "100vw",
          height: "383px",
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
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
            gap: 2,
          }}
        >
          {cards.map((card, index) => (
            <Card sx={{ maxWidth: 400 }} key={index}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </div>

      <div
        className="third-block"
        style={{ height: "400px", backgroundColor: "#F9FAFB", width: "100vw" }}
      >
        <h2> Experience Focused Study Sessions </h2>
        <h4>
          {" "}
          Join or create study rooms with built-in features designed to enhance{" "}
          <br /> your study experience.
        </h4>
        <div className="check-list" style={{ width: "30vw", margin: "0 auto" }}>
          <ul
            style={{ listStyleType: "none", paddingLeft: "0", width: "100vw" }}
          >
            <li
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "25px",
              }}
            >
              <span style={{ marginRight: "10px" }}>✓</span>
              Collaborative study environment
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "25px",
              }}
            >
              <span style={{ marginRight: "10px" }}>✓</span>
              Integrated YouTube player for educational content
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "25px",
              }}
            >
              <span style={{ marginRight: "10px" }}>✓</span>
              Customizable study music playlists
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
