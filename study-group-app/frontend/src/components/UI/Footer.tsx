import React from "react";
import { Container, Typography, Stack, Link, IconButton } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        backgroundColor: "#111827",
        padding: "60px",
      }}
    >
      <Container>
        {/* Main Footer Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          {/* Product Column */}
          <div>
            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "white", fontWeight: 600 }}
            >
              Product
            </Typography>
            <Stack spacing={1}>
              {["Features", "Pricing", "Updates"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{ color: "#9CA3AF", "&:hover": { color: "white" } }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </div>

          {/* Company Column */}
          <div>
            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "white", fontWeight: 600 }}
            >
              Company
            </Typography>
            <Stack spacing={1}>
              {["About Us", "Careers", "Blog"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{ color: "#9CA3AF", "&:hover": { color: "white" } }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </div>

          {/* Support Column */}
          <div>
            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "white", fontWeight: 600 }}
            >
              Support
            </Typography>
            <Stack spacing={1}>
              {["Help Center", "Contact Us", "Terms"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{ color: "#9CA3AF", "&:hover": { color: "white" } }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </div>

          {/* Connect Column */}
          <div>
            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "white", fontWeight: 600 }}
            >
              Connect
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                sx={{ color: "#9CA3AF", "&:hover": { color: "#3b5998" } }}
              >
                <FaFacebook />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                sx={{ color: "#9CA3AF", "&:hover": { color: "#1da1f2" } }}
              >
                <FaTwitter />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                sx={{ color: "#9CA3AF", "&:hover": { color: "#e1306c" } }}
              >
                <FaInstagram />
              </IconButton>
            </Stack>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;