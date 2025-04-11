// import React, { useState } from "react";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import myLogo from "../assets/image.png";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import { Container, Link, Modal } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import { AccountCircle, Checklist, MusicNote } from "@mui/icons-material";
// import Auth from "../components/Authentication/Auth";

// const Welcome = () => {
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

//   const handleOpenAuthModal = () => {
//     setIsAuthModalOpen(true);
//   };

//   const handleCloseAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const cards = [
//     {
//       id: 1,
//       title: "Personal Room",
//       description:
//         "Your private study space with all the tools you need to stay focused.",
//       icon: (
//         <AccountCircle
//           sx={{
//             fontSize: 30,
//             marginRight: "10px",
//             color: "#78CFEB",
//             backgroundColor: "#E0F5FF",
//             borderRadius: "5px",
//           }}
//         />
//       ),
//     },
//     {
//       id: 2,
//       title: "Smart To-do List",
//       description:
//         "Keep track of your tasks and study goals with our intuitive todo list.",
//       icon: (
//         <Checklist
//           sx={{
//             fontSize: 30,
//             marginRight: "10px",
//             color: "#059669",
//             backgroundColor: "#D1FAE5",
//             borderRadius: "5px",
//           }}
//         />
//       ),
//     },
//     {
//       id: 3,
//       title: "Study Room",
//       description:
//         "Access curated playlist and YouTube player for better concentration.",
//       icon: (
//         <MusicNote
//           sx={{
//             fontSize: 30,
//             marginRight: "10px",
//             color: "#7C3AED",
//             backgroundColor: "#EDE9FE",
//             borderRadius: "5px",
//           }}
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
//       {/* Modal for Auth */}
//       <Modal
//         open={isAuthModalOpen}
//         onClose={handleCloseAuthModal}
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backdropFilter: "blur",
//         }}
//       >
//         <Box
//           sx={{
//             borderRadius: "16px",
//             boxShadow: 24,
//             width: "50vw",  
 
//           }}
//         >
//           <Auth />
//         </Box>
//       </Modal>

//       {/* Header */}
//       <div className="header" style={{ width: "100vw" }}>
//         <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: "white" }}>
//           <Toolbar>
//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               <img
//                 src={myLogo}
//                 alt="My Image"
//                 className="logo"
//                 style={{ height: "40px" }}
//               />
//             </Typography>
//             <Box sx={{ display: "flex", gap: "12px" }}>
//               <Button color="inherit">Features</Button>
//               <Button color="inherit">Rooms</Button>
//               <Button color="inherit">About</Button>
//               <Button
//                 variant="contained"
//                 sx={{ backgroundColor: "#927AF4" }}
//                 onClick={handleOpenAuthModal} // Open the Auth modal
//               >
//                 Sign In
//               </Button>
//             </Box>
//           </Toolbar>
//         </AppBar>
//       </div>

//       {/* FRIST BLOCK */}
//       <div
//         className="first-block"
//         style={{
//           background: "linear-gradient(90deg, #F7EEFF 0%, #F3F9FF 100%)",
//           width: "100vw",
//           height: "383px",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Stack className="content" direction="column" spacing={7}>
//           <h1 className="slogan" style={{ paddingTop: "30px" }}>
//             Study Together, <span style={{ color: "#927AF4" }}>Anywhere</span>
//           </h1>
//           <h3>
//             Join our virtual study rooms to stay focused organized, and
//             connected <br />
//             with fellow students worldwide.
//           </h3>
//           <Stack spacing={2} direction="row" justifyContent="center">
//             <Button variant="contained" sx={{ backgroundColor: "#927AF4" }}>
//               Create Room
//             </Button>
//             <Button
//               variant="outlined"
//               sx={{ color: "#927AF4", borderColor: "#927AF4" }}
//             >
//               Join Room
//             </Button>
//           </Stack>
//         </Stack>
//       </div>

//       {/* SECOND BLOCK */}
//       <div
//         className="second-block"
//         style={{
//           height: "328px",
//           display: "flex",
//           justifyContent: "center",
//           backgroundColor: "#FFFFFF",
//           width: "100vw",
//         }}
//       >
//         <Box
//           sx={{
//             marginTop: "60px",
//             width: "100%",
//             height: "200px",
//             display: "flex",
//             gridTemplateColumns:
//               "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
//             gap: 2,
//             justifyContent: "center",
//           }}
//         >
//           {cards.map((card, index) => (
//             <Card sx={{ maxWidth: 400 }} key={index}>
//               <CardContent>
//                 {card.icon}
//                 <Typography
//                   gutterBottom
//                   variant="h5"
//                   component="div"
//                   style={{ fontWeight: "bold" }}
//                 >
//                   {card.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                   {card.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//       </div>

//       {/* THIRD BLOCK */}
//       <div
//         className="third-block"
//         style={{
//           height: "370px",
//           backgroundColor: "#F9FAFB",
//           width: "100vw",
//         }}
//       >
//         <Stack
//           className="content"
//           direction="column"
//           spacing={7}
//           style={{ marginTop: "30px" }}
//         >
//           <Stack
//             className="block2-text"
//             direction="column"
//             spacing={7}
//             alignItems="center"
//           >
//             <h2>Experience Focused Study Sessions</h2>
//             <h4 style={{ textAlign: "center" }}>
//               Join or create study rooms with built-in features designed to
//               enhance <br />
//               your study experience.
//             </h4>
//           </Stack>

//           <div
//             className="check-list"
//             style={{ width: "30vw", margin: "0 auto", marginTop: "20px" }}
//           >
//             <ul
//               style={{
//                 listStyleType: "none",
//                 paddingLeft: "0",
//                 width: "100%",
//               }}
//             >
//               <li
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   paddingLeft: "25px",
//                 }}
//               >
//                 <span style={{ marginRight: "10px" }}>✓</span>
//                 Collaborative study environment
//               </li>
//               <li
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   paddingLeft: "25px",
//                 }}
//               >
//                 <span style={{ marginRight: "10px" }}>✓</span>
//                 Integrated YouTube player for educational content
//               </li>
//               <li
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   paddingLeft: "25px",
//                 }}
//               >
//                 <span style={{ marginRight: "10px" }}>✓</span>
//                 Customizable study music playlists
//               </li>
//             </ul>
//           </div>
//         </Stack>
//       </div>
//       {/* FOURTH BLOCK */}
//       <div
//         className="fourth-block"
//         style={{
//           height: "316px",
//           backgroundColor: "#927AF4",
//           width: "100vw",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Stack
//           className="content"
//           direction="column"
//           spacing={4}
//           sx={{ alignItems: "center" }}
//         >
//           <h1
//             className="slogan"
//             style={{
//               paddingTop: "30px",
//               color: "#FFFFFF",
//             }}
//           >
//             Ready to Start Studying?
//           </h1>
//           <h3
//             style={{
//               paddingTop: "30px",
//               color: "#FFFFFF",
//               textAlign: "center",
//             }}
//           >
//             Join thousands of students who are already using StudyRoom to
//             improve their
//             <br />
//             study habits.
//           </h3>

//           <Button
//             variant="contained"
//             sx={{
//               color: "#927AF4",
//               borderColor: "#927AF4",
//               backgroundColor: "#FFFFFF",
//               maxWidth: "250px",
//             }}
//           >
//             Get Started For Free
//           </Button>
//         </Stack>
//       </div>

//       {/* FOOTER */}
//       <div className="footer" style={{ backgroundColor: "#111827F2" }}>
//         <Box
//           component="footer"
//           sx={{
//             py: 5,
//             px: 2,
//             mt: "auto",
//             color: "#9CA3AF",
//           }}
//         >
//           <Container maxWidth="lg">
//             <Grid container spacing={4}>
//               {/* Product */}
//               <Grid item xs={6} sm={3}>
//                 <Typography
//                   variant="h6"
//                   gutterBottom
//                   style={{ color: "#FFFFFF" }}
//                 >
//                   Product
//                 </Typography>
//                 <Link
//                   href="#"
//                   color="inherit"
//                   display="block"
//                   sx={{ textDecoration: "none" }}
//                 >
//                   Features
//                 </Link>
//                 <Link
//                   href="#"
//                   color="inherit"
//                   display="block"
//                   sx={{ textDecoration: "none" }}
//                 >
//                   Pricing
//                 </Link>
//                 <Link
//                   href="#"
//                   color="inherit"
//                   display="block"
//                   sx={{ textDecoration: "none" }}
//                 >
//                   Updates
//                 </Link>
//               </Grid>

//               {/* Company */}
//               <Grid item xs={6} sm={3}>
//                 <Typography
//                   variant="h6"
//                   gutterBottom
//                   style={{ color: "#FFFFFF" }}
//                 >
//                   Company
//                 </Typography>
//                 <Link
//                   href="#"
//                   color="inherit"
//                   display="block"
//                   sx={{ textDecoration: "none" }}
//                 >
//                   About Us
//                 </Link>
//                 <Link
//                   href="#"
//                   color="inherit"
//                   display="block"
//                   sx={{ textDecoration: "none" }}
//                 >
//                   Careers
//                 </Link>
//                 <Link
//                   href="#"
//                   color="inherit"
//                   display="block"
//                   sx={{ textDecoration: "none" }}
//                 >
//                   Blog
//                 </Link>
//               </Grid>

//               {/* Support */}
//               <Grid item xs={6} sm={3}>
//                 <Typography
//                   variant="h6"
//                   gutterBottom
//                   style={{ color: "#FFFFFF" }}
//                 >
//                   Support
//                 </Typography>
//                 <Link
//                   href="#"
//                   color="inherit"
//                   display="block"
//                   sx={{ textDecoration: "none" }}
//                 >
//                   Help Center
//                 </Link>
//                 <Link
//                   href="#"
//                   color="inherit"
//                   display="block"
//                   sx={{ textDecoration: "none" }}
//                 >
//                   Contact Us
//                 </Link>
//                 <Link
//                   href="#"
//                   color="inherit"
//                   display="block"
//                   sx={{ textDecoration: "none" }}
//                 >
//                   Terms
//                 </Link>
//               </Grid>

//               {/* Connect */}
//               <Grid item xs={6} sm={3}>
//                 <Typography
//                   variant="h6"
//                   gutterBottom
//                   style={{ color: "#FFFFFF" }}
//                 >
//                   Connect
//                 </Typography>
//                 <Box display="flex" gap={2} mt={1}>
//                   <a
//                     href="https://facebook.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <FacebookIcon sx={{ color: "#3b5998" }} />
//                   </a>
//                   <a
//                     href="https://twitter.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <TwitterIcon sx={{ color: "#1da1f2" }} />
//                   </a>
//                   <a
//                     href="https://instagram.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <InstagramIcon sx={{ color: "#e1306c" }} />
//                   </a>
//                 </Box>
//               </Grid>
//             </Grid>

//             {/* Footer Bottom */}
//             <Box mt={5} textAlign="center">
//               <Typography variant="body2" style={{ color: "#9CA3AF" }}>
//                 © {new Date().getFullYear()} StudyRoom. All rights reserved.
//               </Typography>
//             </Box>
//           </Container>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default Welcome;
