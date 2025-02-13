import React, { useState } from "react";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    setIsSubmitted(true); // Show success dialog
    setTimeout(() => setIsSubmitted(false), 3000); // Auto-close after 3 sec
  };

  return (
    <div style={styles.container}>
      <div style={styles.gridContainer}>
        {/* Left Side: Contact Information & Form */}
        <div style={styles.leftSide}>
          {/* Contact Header */}
          <header style={styles.header}>
            <h1 style={styles.title}>Contact CIVEX</h1>
            <p style={styles.subtitle}>
              Whether you're a veteran looking for support or someone who wants to help, we're here to assist you.
            </p>
          </header>

          {/* Contact Information Section */}
          <section style={styles.infoSection}>
            <div style={styles.infoBlock}>
              <h2>📞 Phone</h2>
              <p>1-800-CIVEX-01</p>
            </div>
            <div style={styles.infoBlock}>
              <h2>📧 Email</h2>
              <p>support@civex.org</p>
            </div>
            <div style={styles.infoBlock}>
              <h2>📍 Headquarters</h2>
              <p>1234 Veteran Support Avenue, Washington, D.C.</p>
            </div>
          </section>

          {/* Contact Form */}
          <section style={styles.formSection}>
            <h2>Send Us a Message</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" style={styles.input} required />
              <input type="email" placeholder="Your Email" style={styles.input} required />
              <textarea placeholder="Your Message" style={styles.textarea} required></textarea>
              <button type="submit" style={styles.button}>Submit</button>
            </form>
          </section>
        </div>

        {/* Right Side: Contact Image */}
        <div style={styles.rightSide}>
          <img src="/contactus.png" alt="Contact Us" style={styles.image} />
        </div>
      </div>

      {/* Success Dialog Box */}
      {isSubmitted && (
        <div style={styles.successDialog}>
          <p>✅ Message sent successfully!</p>
        </div>
      )}
    </div>
  );
};

// Inline CSS with Grid Layout & Success Dialog Styling
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "40px",
    maxWidth: "1200px",
    margin: "auto",
    position: "relative",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Split into two columns (left & right)
    gap: "40px",
    alignItems: "center",
  },
  leftSide: {
    textAlign: "left",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    lineHeight: "1.5",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
  },
  infoBlock: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "left",
  },
  formSection: {
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    height: "120px",
  },
  button: {
    padding: "12px 20px",
    background: "#355545", // Updated button color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s ease",
  },
  buttonHover: {
    background: "#2a4636", // Darker shade on hover
  },
  rightSide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  successDialog: {
    position: "fixed",
    top: "90px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#355545",
    color: "white",
    padding: "15px 35px",
    borderRadius: "5px",
    fontSize: "16px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  },
};

export default Contact;
