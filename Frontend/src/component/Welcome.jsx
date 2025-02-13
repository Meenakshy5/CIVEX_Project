import { React, useRef, useEffect } from "react";
import { Grid2, Typography, Box, Container, Avatar, Button,Card, CardContent,IconButton,TextField } from '@mui/material';
import { keyframes } from '@mui/system';
import "@fontsource/montserrat"; // Import a Google Font
import "@fontsource/lobster";  
import CountUp from 'react-countup';
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { FaGoogle, FaApple, FaAmazon, FaMicrosoft, FaFacebook } from "react-icons/fa"; 
import { Link } from "react-router-dom"; // Import Link from react-router-dom


// Define animation for the logo
const logoAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const stats = [
  { value: 120, label: 'Companies', icon: <BusinessIcon fontSize="large" /> },
  { value: 480, label: 'Applications', icon: <DescriptionIcon fontSize="large" /> },
  { value: 120, label: 'Jobs Posted', icon: <EventNoteIcon fontSize="large" /> },
  { value: 200, label: 'Members', icon: <GroupIcon fontSize="large" /> },
];

const companies = [
  { name: "Google", icon: <FaGoogle size={50} /> },
  { name: "Apple", icon: <FaApple size={50} /> },
  { name: "Microsoft", icon: <FaMicrosoft size={50} /> },
  { name: "Amazon", icon: <FaAmazon size={50} /> },
  { name: "Meta", icon: <FaFacebook size={50} /> },
];

const successStories = [
  {
    name: "Sarah Miller",
    company: "Recruited at Company X",
    statement:
      "The training and exposure I gained at CIVEX truly shaped my career. The journey has been incredible!",
    image: "/person1.jpg",
  },
  {
    name: "Jane Smith",
    company: "Recruited at Company Y",
    statement:
      "CIVEX equipped me with skills and confidence to achieve my dreams. I’ll always cherish this experience!",
    image: "/person2.jpg",
  },
  {
    name: "Susan James",
    company: "Software Engineer at Company Z",
    statement:
      "An amazing platform that opened new career opportunities for me. Highly recommended!",
    image: "/th.jpg",
  },
];
const linkStyle = {
  display: "block",
  color: "inherit",
  marginBottom: "8px",
  textDecoration: "none",
  fontSize: "16px",
};

const Welcome = () => {
// some parts of the success stories
const scrollContainerRef = useRef(null);

useEffect(() => {
  const scrollContainer = scrollContainerRef.current;
  let scrollAmount = 0;

  const scrollInterval = setInterval(() => {
    if (scrollContainer) {
      scrollContainer.scrollLeft += 1.5;
      scrollAmount += 1.5;

      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
        scrollAmount = 0;
      }
    }
  }, 20);

  return () => clearInterval(scrollInterval);
}, []);

  return (
    <div>
      {/* Welcome Section with Logo */}
      <Grid2
        container
        item
        direction="row"
        alignItems="center"
        justifyContent="center"

        style={{
          padding: '20px',  // Adjusted padding
          minHeight: '5vh',  // Reduced height
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/header (3).jpg")',
          backgroundSize: 'cover',  // Ensures the background covers the entire section
          backgroundPosition: 'center',  // Center the background image
          backgroundRepeat: 'no-repeat',  // Avoid tiling of the image
        }}
      >
        {/* Logo Section */}
        <Grid2 item xs={4} style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <Avatar
            src="/CivExLogo.png"
            alt="Website Logo"
            sx={{
              width: 400,  // Increased logo size
              height: 300,  // Increased logo size
              animation: `${logoAnimation} 5s infinite`,  // Animation
            }}
          />
        </Grid2>

        {/* Welcome Text Section */}
        <Grid2 item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' ,textAlign: 'center'}}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: '3rem',
              color: 'white',
              fontFamily: 'Strong Serif Font', // Stylish font
              fontWeight: 'bold',
            }}
          >
            CIVEX : Empowering Veterans
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem',
              color: 'white',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            Welcome to the CIVEX platform, where we connect veterans with job opportunities
            to help them reintegrate and thrive in civilian life. Let us help you find the
            right career path.
          </Typography>
        </Grid2>
      </Grid2>

      <Box sx={{ textAlign: 'center', padding: '30px 20px', backgroundColor: '#f5f5f5' }}>
        {/* Section Title */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: '2.5rem',
            color: '#355545',
            border: '3px solid #355545',
            padding: '  0px 30px',
            borderRadius: '10px',
            display: 'inline-block',
            marginBottom: '10px', // Increased spacing
          }}
        >
          Our Numbers
        </Typography>

        {/* Animated Numbers */}
        <Grid2 container spacing={25} justifyContent="center" sx={{ textAlign: 'center' }}>
          {stats.map((item, index) => (
            <Grid2
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <Typography sx={{ color: '#355545', fontSize: '5rem' }}>{item.icon}</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#355545' }}>
                <CountUp end={item.value} duration={3} />
              </Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: '#355545', textTransform: 'uppercase' }}>
                {item.label}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      </Box>

{/* Popular Categories Section */}
<Grid2 item>
  <Box
    sx={{
      padding: '60px 40px',
      minHeight: '60vh',
      backgroundImage: 'url("/handshake.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        zIndex: 1,
      },
    }}
  >
    <Grid2 container direction="column" alignItems="center" spacing={5} sx={{ position: 'relative', zIndex: 2 }}>
      
      {/* Section Title */}
      <Grid2 item>
        <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold', fontSize: '3rem', textAlign: 'center' }}>
          Popular Categories
        </Typography>
        <Typography sx={{ color: 'white', textAlign: 'center', fontSize: '1.2rem' }}>
          Explore the top job categories and find your next opportunity.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Box sx={{ width: '50px', height: '3px', backgroundColor: '#355545', marginRight: '5px' }} />
          <Box sx={{ width: '10px', height: '10px', backgroundColor: '#355545', borderRadius: '50%' }} />
          <Box sx={{ width: '50px', height: '3px', backgroundColor: '#355545', marginLeft: '5px' }} />
        </Box>
      </Grid2>

      {/* Category Boxes */}
      <Grid2 container item spacing={5} justifyContent="center" sx={{ textAlign: 'center' }}>
        
        {[
          { icon: <PersonIcon sx={{ fontSize: 40, color: '#355545' }} />, title: "Developer", jobs: "780 Jobs" },
          { icon: <ComputerIcon sx={{ fontSize: 40, color: '#355545' }} />, title: "Technology", jobs: "1270 Jobs" },
          { icon: <AccountBalanceIcon sx={{ fontSize: 40, color: '#355545' }} />, title: "Government", jobs: "2024 Jobs" },
          { icon: <BuildIcon sx={{ fontSize: 40, color: '#355545' }} />, title: "All Jobs", jobs: "5000+ Jobs" },
        ].map((category, index) => (
          <Grid2 item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '60px',
                maxWidth: '280px',
                height: '170px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              {/* Icon */}
              <Box sx={{ 
                width: 80, height: 80, borderRadius: '50%', backgroundColor: '#DCE7E4', // Lighter green shade
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px'
              }}>
                {category.icon}
              </Box>
              
              {/* Title */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                {category.title}
              </Typography>
              
              {/* Jobs Count */}
              <Typography sx={{ fontSize: '1.1rem', fontWeight: '500', color: '#355545', marginTop: '10px' }}>
                {category.jobs}
              </Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  </Box>
</Grid2>

{/* How CIVEX Works Section */}
<Grid2
  container
  item
  direction="column"
  alignItems="center"
  justify="center"
  sx={{ padding: '30px' }}
>
  {/* Section Title */}
  <Typography
    variant="h4"
    gutterBottom
    sx={{
      fontWeight: 'bold',
      color: '#355545',
      border: '2px solid #355545',
      padding: '10px 20px',
      borderRadius: '8px',
      display: 'inline-block',
    }}
  >
    How CIVEX Works
  </Typography>

  {/* Steps */}
  <Grid2
    container
    item
    spacing={4}
    justifyContent="center"
    sx={{ textAlign: 'center', marginTop: '20px' }}
  >
    {[
      {
        step: "Step 1: Register an account",
        description:
          "Donec pede justo fringilla vel aliquet nec vulputate eget arcu. In enim justo rhoncus ut a, venenatis vitae justo.",
        icon: <PersonIcon sx={{ fontSize: 50, color: '#355545' }} />,
      },
      {
        step: "Step 2: Search your job",
        description:
          "Aliquam lorem ante dapibus in, viverra feugiatquis a tellus. Phasellus viverra nulla ut metus varius Quisque rutrum.",
        icon: <WorkIcon sx={{ fontSize: 50, color: '#355545' }} />,
      },
      {
        step: "Step 3: Apply for job",
        description:
          "Nullam dictum felis eu pede mollis pretiumetus Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
        icon: <BusinessCenterIcon sx={{ fontSize: 50, color: '#355545' }} />,
      },
    ].map((item, index) => (
      <Grid2 item xs={12} sm={6} md={4} key={index}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            height: '300px',
            width: '100%',
            maxWidth: '300px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            border: '2px solid #355545',
            transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s, color 0.3s',
            position: 'relative',

            // When the whole box is hovered, change its background and text colors
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#355545',
              color: 'white', // Makes all text inside white
            },

            // When the box is hovered, make the button text white
            '&:hover .read-more-button': {
              color: 'white',
              borderColor: 'white',
            },
          }}
        >
          {/* Step Number Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              backgroundColor: '#355545',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            {index + 1}
          </Box>

          {/* Icon inside Circle */}
          <Box
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#d5dbd5', // Lighter shade of #355545
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px',
            }}
          >
            {item.icon}
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            {item.step}
          </Typography>

          <Typography variant="body2" sx={{ marginBottom: '15px', padding: '0 10px' }}>
            {item.description}
          </Typography>

          <Button
            variant="outlined"
            className="read-more-button"
            sx={{
              borderColor: '#355545',
              color: '#355545',
              transition: 'color 0.3s, border-color 0.3s',
              '&:hover': { borderColor: 'white', backgroundColor: '#355545', color: 'white' },
            }}
          >
            Read more
          </Button>
        </Box>
      </Grid2>
    ))}
  </Grid2>
</Grid2>

{/* Our Clients Section */}
<Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ padding: "40px", backgroundColor: "#e1ece4" }} // Light background
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#355545", textAlign: "center" }}
      >
        Our Clients
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{
          color: "#555",
          textAlign: "center",
          maxWidth: "600px",
          marginBottom: "20px",
        }}
      >
        We work with some of the most well-known companies in the world, providing top-notch solutions for their needs.
      </Typography>

      {/* Logos Grid */}
      <Grid2 container item spacing={10} justifyContent="center">
        {companies.map((company, index) => (
          <Grid2 item key={index}>
            <Grid2
              container
              direction="column"
              alignItems="center"
              sx={{
                color: "#647b64", // Default green color
                transition: "color 0.3s ease-in-out",
                "&:hover": { color: "#355545" }, // Change color on hover
              }}
            >
              {company.icon}
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginTop: "10px" }}
              >
                {company.name}
              </Typography>
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>


     {/* Success Stories Section */}
     <Grid2
        container
        item
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: "50px", backgroundColor: "#f8f9fa", overflow: "hidden" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontWeight: "bold", color: "#355545", marginBottom: "20px" }}
        >
          Success Stories
        </Typography>

        <div
          ref={scrollContainerRef}
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            scrollBehavior: "unset",
            width: "90%",
            padding: "30px",
            scrollbarWidth: "none",
            backgroundColor: "#e1ece4",
          }}
        >
          {successStories.map((story, index) => (
            <Card
              key={index}
              style={{
                minWidth: "100px",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                flexShrink: 0,
              }}
            >
              <CardContent style={{ textAlign: "center" }}>
                <Avatar
                  src={story.image}
                  alt={story.name}
                  sx={{
                    width: 100,
                    height: 100,
                    margin: "0 auto",
                    marginBottom: "10px",
                  }}
                />
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", color: "#2a4158" }}
                >
                  {story.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "10px", color: "#4a4a4a" }}
                >
                  {story.company}
                </Typography>
                <Typography variant="body2" style={{ color: "#555" }}>
                  "{story.statement}"
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Grid2>

 {/* Footer Section */}
 <Grid2 item>
  <Box
    sx={{
      backgroundColor: "#355545", // Dark background
      color: "#ffffff", // White text
      padding: "0.6rem 1rem", // Reduced padding for compact height
    }}
  >
    {/* First Row: Logo, Quick Links */}
    <Grid2 container spacing={120} >
      {/* Logo Section */}
      <Grid2 item xs={12} md={4} sx={{ textAlign: "left" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img src="/CivExLogo.png" alt="CIVEX Logo" style={{ height: "50px" }} /> 
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>CIVEX</Typography>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Empowering Veterans and Building a Stronger Tomorrow.
        </Typography>
      </Grid2>

{/* Quick Links Section */}
<Grid2 item xs={12} md={4} sx={{ textAlign: "right" }}>
  <Typography variant="h6" sx={{ fontWeight: "bold" }}>Quick Links</Typography>
  <Box sx={{ marginTop: 1 }}>
    <Link to="/" style={linkStyle}>Home</Link>
    <Link to="/about" style={linkStyle}>About Us</Link>
    <Link to="/contact" style={linkStyle}>Contact Us</Link>
  </Box>
</Grid2>
    </Grid2>

    {/* Second Row: Social Media , Subscribe, Map */}
    <Grid2 container spacing={44} alignItems="center" sx={{ marginTop: 2 }}>
      {/* Social Media Links */}
      <Grid2 item xs={12} md={4} sx={{ textAlign: "left" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Follow Us</Typography>
        <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
          <IconButton href="https://www.linkedin.com/jobs/search?trk=content-hub-home-page_guest_nav_menu_jobs&position=1&pageNum=0" sx={{ color: "inherit" }}><LinkedIn /></IconButton>
          <IconButton href="https://www.facebook.com/facebook/" sx={{ color: "inherit" }}><Facebook /></IconButton>
          <IconButton href="https://x.com/" sx={{ color: "inherit" }}><Twitter /></IconButton>
        </Box>
      </Grid2>

      {/* Subscribe Section */}
      <Grid2 item xs={12} md={4} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Subscribe</Typography>
        <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
          <input
            type="email"
            placeholder="Your Email"
            style={{
              padding: "0.5rem",
              border: "1px solid #b0bec5",
              borderRadius: "5px",
              flex: 1,
            }}
          />
          <Button variant="contained" sx={{ backgroundColor: "#647b64", color: "#fff" }}>
            Subscribe
          </Button>
        </Box>
      </Grid2>
      {/* Embedded Google Map */}
      <Grid2 item xs={12} md={8}>
        <Box sx={{ borderRadius: "8px", overflow: "hidden" }}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5119466267277!2d144.963157815318!3d-37.8141079797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1617656548407!5m2!1sen!2sus"
            width="100%"
            height="140"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
      </Grid2>
    </Grid2>

    {/* Footer Bottom */}
    <Typography variant="body2" sx={{ textAlign: "center", marginTop: 3, color: "#b0bec5" }}>
      © 2025 CIVEX. All rights reserved.
    </Typography>
  </Box>
</Grid2>


    </div>
  );
};
const ErrorPage = () => {
  return (
    <Grid2 container item direction="column" alignItems="center" justify="center" style={{ padding: '30px', minHeight: '93vh' }}>
      <Grid2 item>
        <Typography variant="h2">Error 404</Typography>
      </Grid2>
    </Grid2>
  );
};
export { ErrorPage };
export default Welcome; 