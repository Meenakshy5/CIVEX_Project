import React from "react";
import { useNavigate } from "react-router-dom"; 

const About = () => {
    const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>CIVEX: Empowering Veterans</h1>
        <p style={styles.subtitle}>
          Supporting veterans in their transition to civilian life through career development, 
          mentorship, and community engagement.
        </p>
      </header>

      {/* Who We Are Section */}
      <section style={styles.section}>
        <div style={styles.textContainer}>
          <h2 style={styles.heading}>Who We Are</h2>
          <p>
            CIVEX was founded with a mission to empower veterans by providing them with the 
            resources, guidance, and opportunities needed to thrive in civilian life. 
            Our team consists of dedicated professionals, veterans, and mentors who are passionate 
            about creating a positive impact.
          </p>
        </div>
        <img src="/happyveteran.png" alt="Veterans Community" style={styles.image} />
      </section>

      {/* Our Vision */}
      <section style={styles.sectionReverse}>
        <img src="/vission.png" alt="Our Vision" style={styles.image} />
        <div style={styles.textContainer}>
          <h2 style={styles.heading}>Our Vision</h2>
          <p>
            We envision a world where every veteran has access to a strong support system, 
            career advancement programs, and a thriving community. Our goal is to bridge the 
            gap between military service and civilian success.
          </p>
        </div>
      </section>

      {/* Our Impact */}
      <section style={styles.section}>
        <div style={styles.textContainer}>
          <h2 style={styles.heading}>Our Impact</h2>
          <p>
            Since our founding, CIVEX has helped over <strong>10,000 veterans</strong> connect with mentors, 
            find employment, and build meaningful careers. Our initiatives focus on job training, 
            skill development, mental health awareness, and professional networking.
          </p>
        </div>
        <img src="/impact.png" alt="Impact" style={styles.image} />
      </section>

      {/* Call to Action */}
      <section style={styles.callToAction}>
        <h2>Join Our Mission</h2>
        <p>
          Are you a veteran looking for support? Or do you want to help empower our heroes? 
          Join our community and make a difference.
        </p>
        <button style={styles.button} onClick={() => navigate("/login")}>Get Involved</button>
      </section>
    </div>
  );
};

// Inline CSS with Improved Design
const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    padding: "40px",
    maxWidth: "1200px",
    margin: "auto",
    textAlign: "center",
    color: "#333",
  },
  header: {
    marginBottom: "50px",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#355545",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: "auto",
  },
  section: {
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    marginBottom: "60px",
    padding: "20px",
    borderRadius: "8px",
    background: "#f9f9f9",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  sectionReverse: {
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    flexDirection: "row-reverse",
    marginBottom: "60px",
    padding: "20px",
    borderRadius: "8px",
    background: "#f9f9f9",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  textContainer: {
    flex: 1,
    padding: "20px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#355545",
    marginBottom: "10px",
  },
  image: {
    width: "45%",
    borderRadius: "8px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  imageHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.3)",
  },
  callToAction: {
    backgroundColor: "#355545",
    color: "white",
    padding: "30px",
    borderRadius: "8px",
    textAlign: "center",
    marginTop: "50px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#f4f4f4",
    color: "#355545",
    fontSize: "16px",
    fontWeight: "bold",
    border: "2px solid #355545",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    marginTop: "15px",
  },
  buttonHover: {
    backgroundColor: "#355545",
    color: "white",
  },
};

export default About;
