import React, { useState } from "react";
import { Container, Typography, Box, AppBar, Toolbar, Button, Modal } from "@mui/material";
import myLogo from "../assets/image.png";
import Auth from "../components/Authentication/Auth";
import Footer from "../components/UI/Footer";
import Header from "../components/UI/Header";
const About = () => {
    return(
    <div>
        <Header/>
    <Container
      maxWidth="md"
      style={{ marginTop: "2em", marginBottom: "2em" }}
    >

        <Typography
          variant="h4"
          gutterBottom
          style={{ color: "#927AF4", fontWeight: "bold" }}
        >
          About Lumora
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to Lumora, your virtual study sanctuary designed to help
          students stay focused, organized, and motivated—whether you're
          studying alone or collaborating with peers. In today’s fast-paced
          digital world, maintaining concentration and productivity can be
          challenging. Distractions are everywhere, and traditional group study
          sessions can be difficult to coordinate. Lumora was created to offer
          a structured, calming, and customizable online environment that
          brings the best of both solo and group studying together in one
          seamless platform.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is simple: to support students in building effective
          study habits through thoughtful design and purposeful tools. Lumora
          offers a range of features that help you manage your time, stay on
          track, and feel connected. From our integrated Pomodoro timer and
          to-do list, to real-time video conferencing, an interactive
          whiteboard, and an ambient music player, every feature is designed to
          enhance your learning experience and help you get the most out of
          your study sessions.
        </Typography>
        <Typography variant="body1" paragraph>
          We believe that your study space should reflect your personal style
          and support your mental well-being. That’s why Lumora includes
          customizable background themes—such as cozy cafés, minimalist
          workspaces, and nature scenes—and soft, calming color palettes
          including shades of light purple and blue, which are known to promote
          relaxation, creativity, and focus. You can also choose from curated
          lo-fi playlists or add your own, creating a sensory environment that
          helps you get in the zone.
        </Typography>
        <Typography variant="body1" paragraph>
          Lumora was built by 2 students who understand the ups and
          downs of academic life. Our goal was to create a platform we wished
          we had—a tool that doesn't just manage tasks but supports motivation,
          connection, and balance. We're continuously working to improve Lumora
          and introduce new features, such as intelligent study partner
          matching and deeper progress analytics, to further empower your
          learning journey.
        </Typography>
        <Typography variant="body1" paragraph>
          We’re always open to feedback, collaboration, or simply hearing about
          how Lumora has helped you study better. Feel free to reach out
          through our contact form or email us at{" "}
          <a
            href="mailto:christelle.charles@mail.concordia.ca"
            style={{ color: "#927AF4", textDecoration: "none" }}
          >
            christelle.charles@mail.concordia.ca
          </a>
          . We’re glad you’re here—now, let’s get studying.
        </Typography>

    </Container>
    <Footer/>
    </div>
  );
};

export default About;


