import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import axios from 'axios';
import apiList from "../lib/apiList";
import 'react-phone-number-input/style.css'; // Import the styles
import PhoneInput from 'react-phone-number-input'; // Import the PhoneInput component

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'applicant',
    email: '',
    password: '',
    name: '',
    education: [{ institutionName: '', startYear: '', endYear: '' }],
    skills: '',
    bio: '',
    contactNumber: '',
    resume: null,
    profile: null
  });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    resume: false,
    profile: false
  });

  const handleInputChange = (field, value) => {
    if (field === 'email') {
      setEmailError('');
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    handleInputChange('email', email);
    
    if (email && email.includes('@') && email.includes('.')) {
      checkEmailExists(email);
    }
  };

  const checkEmailExists = async (email) => {
    if (!email) return false;
    
    try {
      setIsCheckingEmail(true);
      const response = await axios.post(apiList.checkEmail, { email });
      if (response.data.exists) {
        setEmailError('This email is already registered');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error checking email:', err);
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleEducationChange = (index, field, value) => {
    setFormData(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prev, education: newEducation };
    });
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institutionName: '', startYear: '', endYear: '' }]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = async (file, type) => {
    if (!file) return null;
  
    // Validate file type
    if (type === 'resume' && !file.type.includes('pdf')) {
      setError('Resume must be a PDF file');
      return null;
    }
  
    // Validate file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return false;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      setUploadProgress({ ...uploadProgress, [type]: true });
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const response = await axios.post(
        type === 'resume' ? apiList.uploadResume : apiList.uploadProfileImage,
        formData,
        config
      );
  
      if (response.data && response.data.url) {
        return response.data.url;
      } else {
        throw new Error('No URL in response');
      }
    } catch (err) {
      console.error(`${type} upload failed:`, err.response?.data || err.message);
      setError(`${type === 'resume' ? 'Resume' : 'Profile image'} upload failed: ${err.response?.data?.message || err.message}`);
      return null;
    
    } finally {
      setUploadProgress({ ...uploadProgress, [type]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let submitData = {
        email: formData.email,
        password: formData.password,
        type: formData.type,
        name: formData.name,
        education: formData.education.map(edu => ({
          ...edu,
          startYear: parseInt(edu.startYear),
          endYear: parseInt(edu.endYear)
        })),
        skills: formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : [],
        bio: formData.bio,
        contactNumber: formData.contactNumber,
      };

      if (formData.resume) {
        const resumeUrl = await handleFileUpload(formData.resume, 'resume');
        if (resumeUrl) {
          submitData.resume = resumeUrl;
        }
      }

      if (formData.profile) {
        const profileUrl = await handleFileUpload(formData.profile, 'profile');
        if (profileUrl) {
          submitData.profile = profileUrl;
        }
      }

      console.log("Submitting data:", submitData);
    
      const response = await axios.post(apiList.signup, submitData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('type', response.data.type);
        navigate('/');
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      let errorMessage = 'Signup failed';
      
      if (err.response) {
        if (err.response.data.code === 11000) {
          errorMessage = 'This email is already registered';
        } else {
          errorMessage = err.response.data.message || errorMessage;
        }
      }
      
      setError(errorMessage);
      console.error('Signup error:', err);
    }
  };

  return (
<Box
  component="form"
  onSubmit={handleSubmit}
  sx={{ 
    maxWidth: 600, 
    mx: 'auto', 
    p: 3, 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight transparency
    borderRadius: 2, 
    boxShadow: 3,
    zIndex: 1,
    backdropFilter: 'blur(5px)' // Subtle blur effect
  }}
>

      <Typography variant="h4" gutterBottom>Signup</Typography>
      
      <TextField
        select
        fullWidth
        margin="normal"
        label="Category"
        value={formData.type}
        onChange={(e) => handleInputChange('type', e.target.value)}
      >
        <MenuItem value="applicant">Applicant</MenuItem>
        <MenuItem value="recruiter">Recruiter</MenuItem>
      </TextField>

      <TextField
        fullWidth
        margin="normal"
        label="Name"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleEmailChange}
        error={!!emailError}
        helperText={emailError || (isCheckingEmail ? 'Checking email...' : '')}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        required
      />

      {formData.type === 'applicant' && (
        <>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Education</Typography>
          {formData.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1">Education #{index + 1}</Typography>
                {formData.education.length > 1 && (
                  <IconButton onClick={() => removeEducation(index)} size="small">
                    <Minus className="h-4 w-4" />
                  </IconButton>
                )}
              </Box>
              
              <TextField
                fullWidth
                margin="normal"
                label="Institution Name"
                value={edu.institutionName}
                onChange={(e) => handleEducationChange(index, 'institutionName', e.target.value)}
                required
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Start Year"
                type="number"
                value={edu.startYear}
                onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                required
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="End Year"
                type="number"
                value={edu.endYear}
                onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                required
              />
            </Box>
          ))}
          
          <Button
            startIcon={<Plus className="h-4 w-4" />}
            onClick={addEducation}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Add Education
          </Button>

          <TextField
            fullWidth
            margin="normal"
            label="Skills (comma-separated)"
            value={formData.skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
          />
          
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Resume (PDF)</Typography>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleInputChange('resume', e.target.files[0])}
            />
          </Box>
          
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Profile Picture</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleInputChange('profile', e.target.files[0])}
            />
          </Box>
        </>
      )}

      {formData.type === 'recruiter' && (
        <>
          <TextField
            fullWidth
            margin="normal"
            label="Bio"
            multiline
            rows={4}
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
          />
          
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Contact Number</Typography>
            <PhoneInput
              international
              defaultCountry="IN" // Default country (India)
              value={formData.contactNumber}
              onChange={(value) => handleInputChange('contactNumber', value)}
              style={{ width: '100%' }}
            />
          </Box>
        </>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={isCheckingEmail || !!emailError}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;