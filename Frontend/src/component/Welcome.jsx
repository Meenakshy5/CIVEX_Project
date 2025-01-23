import React from 'react';
import { Grid2, Typography, Box, Container, Avatar, Button } from '@mui/material';
import { keyframes } from '@mui/system';
import "@fontsource/montserrat"; // Import a Google Font
import "@fontsource/lobster";  
import CountUp from 'react-countup';

// Define animation for the logo
const logoAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Welcome = () => {
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
          minHeight: '80vh',  // Reduced height
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/header.jpg")',
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
              width: 500,  // Increased logo size
              height: 500,  // Increased logo size
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
              fontSize: '3.5rem',
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
              fontSize: '1.5rem',
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

      {/* Count Section with Animation */}
      <Grid2
  container
  item
  direction="column"
  alignItems="center"
  justify="center"
  sx={{ padding: '30px', color: '#355545' }}
>
  {/* Section Title */}
  <Typography
    variant="h4"
    gutterBottom
    sx={{
      fontWeight: 'bold',
      fontSize: '2.5rem',
      color: '#355545',
      border: '2px solid #355545',
      padding: '10px 20px',
      borderRadius: '8px',
      display: 'inline-block',
    }}
  >
    Our Numbers
  </Typography>

  {/* Animated Numbers */}
  <Grid2
    container
    item
    spacing={4}
    justifyContent="center"
    sx={{ textAlign: 'center', marginTop: '20px' }}
  >
    {[
      { value: 120, label: 'Companies' },
      { value: 480, label: 'Applications' },
      { value: 120, label: 'Jobs Posted' },
      { value: 200, label: 'Members' },
    ].map((item, index) => (
      <Grid2 item xs={12} sm={6} md={3} key={index}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            fontSize: '3rem',
            color: '#2c7a7b',
          }}
        >
          <CountUp end={item.value} duration={3} />
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: '500', fontSize: '1.2rem', color: '#355545' }}
        >
          {item.label}
        </Typography>
      </Grid2>
    ))}
  </Grid2>
</Grid2>

      {/* Popular Categories Section */}
      <Grid2 item>
        <Box
        sx={{
          padding: '40px',minHeight: '60vh',backgroundImage: 'url("/handshake.jpg")',backgroundSize: 'cover',backgroundPosition: 'center',
          position: 'relative','&::before': {content: '""',position: 'absolute',
          top: 0,left: 0, width: '100%', height: '100%',backgroundColor: 'rgba(0, 0, 0, 0.5)',backdropFilter: 'blur(5px)', zIndex: 1,}, }}>
      <Grid2 container direction="column" alignItems="center" spacing={4}sx={{ position: 'relative', zIndex: 2 }} >
      {/* Section Title */}
      <Grid2 item>
        <Typography
          variant="h4"gutterBottom sx={{color: 'white',fontWeight: 'bold', fontSize: '4rem', }}>
          Popular Categories
        </Typography>
      </Grid2>

      {/* Category Boxes */}
      <Grid2
        container item spacing={7} justifyContent="center" sx={{ textAlign: 'center' }}
      >
        {/* Category Box Template */}
        {[
          {
            src: "/developer.png",alt: "Developer",title: "Developer",description: "Build and innovate with cutting-edge technologies to solve real-world problems.",
          },
          {
            src: "/technology (2).png",alt: "Technology",title: "Technology", description: "Stay ahead with the latest in tech advancements and trends.",
          },
          {
            src: "/industry.png",alt: "Industry",title: "Industry",description: "Learn about key industry trends and opportunities to enhance your career.",
          },
        ].map((category, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',padding: '20px', maxWidth: '300px',height: '250px',boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(5px)',
                color: 'white',transition: 'transform 0.3s, box-shadow 0.3s','&:hover': {
                  transform: 'scale(1.05)',boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',},
              }}
            >
              <Avatar
                src={category.src}alt={category.alt}sx={{ width: 80, height: 80, marginBottom: '10px' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {category.title}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: '5px' }}>
                {category.description}
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
    sx={{fontWeight: 'bold',color: '#355545', border: '2px solid #355545', padding: '10px 20px',borderRadius: '8px',display: 'inline-block',}}>
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
          " Donec pede justo fringilla vel aliquet nec vulputate eget arcu. In enim justo rhoncus ut a, venenatis vitae justo.",
      },
      {
        step: "Step 2: Search your job",
        description:
          "Aliquam lorem ante dapibus in, viverra feugiatquis a tellus. Phasellus viverra nulla ut metus varius Quisque rutrum.",
      },
      {
        step: "Step 3: Apply for job",
        description:
          "Nullam dictum felis eu pede mollis pretiumetus Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
      },
    ].map((item, index) => (
      <Grid2 item xs={12} sm={6} md={4} key={index}>
        <Box
          sx={{
            display: 'flex',flexDirection: 'column', alignItems: 'center',  justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',padding: '20px',height: '250px', width: '100%', maxWidth: '300px', 
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',backdropFilter: 'blur(5px)', border: '2px solid #355545',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {transform: 'scale(1.05)',boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',backgroundColor: '#355545',color: 'white', },
          }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            {item.step}
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginBottom: '15px', padding: '0 10px' }}
          >
            {item.description}
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#355545',color: '#355545',
              '&:hover': {borderColor: 'white',backgroundColor: '#355545',color: 'white',},
            }}>
            Read more
          </Button>
        </Box>
      </Grid2>
    ))}
  </Grid2>
</Grid2>


      {/* Popular Companies Section */}
      <Grid2 container item direction="column" alignItems="center" justify="center" style={{ padding: '30px', backgroundColor: '#54876e' }}>
        <Typography variant="h4" gutterBottom>
          Popular Companies
        </Typography>
        <Grid2 container item spacing={4} justify="center">
          {/* Company 1 */}
          <Grid2 item>
            <Avatar src="windows.png" alt="Microsoft" sx={{ width: 100, height: 100 }} />
          </Grid2>
          {/* Company 2 */}
          <Grid2 item>
            <Avatar src="/twitter.png" alt="Twitter" sx={{ width: 100, height: 100 }} />
          </Grid2>
        </Grid2>
      </Grid2>

      {/* Success Stories Section */}
      <Grid2 container item direction="column" alignItems="center" justify="center" style={{ padding: '30px' }}>
        <Typography variant="h4" gutterBottom>
          Success Stories
        </Typography>
        <Grid2 container item spacing={4} justify="center">
          {/* Success Story 1 */}
          <Grid2 item>
            <Avatar src="/person1.jpg" alt="Person 1" sx={{ width: 80, height: 80 }} />
            <Typography variant="body1">Sarah Miller - Recruited at Company X</Typography>
          </Grid2>
          {/* Success Story 2 */}
          <Grid2 item>
            <Avatar src="/person2.jpg" alt="Person 2" sx={{ width: 80, height: 80 }} />
            <Typography variant="body1">Jane Smith - Recruited at Company Y</Typography>
          </Grid2>
        </Grid2>
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
