import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Chip,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";  // Updated import

import axios from "axios";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";

// Styled components using MUI v5 system
const PopupDialog = styled('div')({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5', // Light background for the dialog
});

const ChipContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '15px',
});

const ChipStyled = styled(Chip)(({ theme }) => ({
  backgroundColor: '#355545', // Primary color
  color: 'white',
  '&:hover': {
    backgroundColor: '#2a4538', // Darker shade on hover
  },
}));

const InputBox = styled(Box)({
  marginBottom: '20px',
});

const CreateJobsPaper = styled(Paper)({
  padding: '20px',
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff', // White background for the paper
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(53, 85, 69, 0.1)', // Subtle shadow
  width: '800px', // Increased width of the form
  maxWidth: '90%', // Ensure it doesn't overflow on smaller screens
});

const CreateJobsButton = styled(Button)({
  padding: '10px 50px',
  marginTop: '30px',
  backgroundColor: '#355545', // Primary color
  color: 'white',
  '&:hover': {
    backgroundColor: '#2a4538', // Darker shade on hover
  },
});

const CreateJobsTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#355545', // Primary color for the border
    },
    '&:hover fieldset': {
      borderColor: '#2a4538', // Darker shade on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#355545', // Primary color when focused
    },
  },
});

const CreateJobs = (props) => {
  const setPopup = useContext(SetPopupContext);

  const [jobDetails, setJobDetails] = useState({
    title: "",
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    duration: 0,
    salary: 0,
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleAddSkill = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      setJobDetails({
        ...jobDetails,
        skillsets: [...jobDetails.skillsets, event.target.value.trim()],
      });
      event.target.value = ""; // clear the input after adding
    }
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = jobDetails.skillsets.filter((_, i) => i !== index);
    setJobDetails({
      ...jobDetails,
      skillsets: updatedSkills,
    });
  };

  const handleUpdate = () => {
    console.log(jobDetails);
    axios
      .post(apiList.jobs, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setJobDetails({
          title: "",
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  return (
    <PopupDialog>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item>
          <Typography variant="h2" style={{ color: '#355545' }}>Add Job</Typography>
        </Grid>
        <Grid item container xs direction="column" justify="center">
          <Grid item>
            <CreateJobsPaper>
              <Grid container direction="column" alignItems="stretch" spacing={3}>
                <Grid item>
                  <CreateJobsTextField
                    label="Title"
                    value={jobDetails.title}
                    onChange={(event) => handleInput("title", event.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <CreateJobsTextField
                    label="Skills"
                    variant="outlined"
                    fullWidth
                    onKeyDown={handleAddSkill}
                    helperText="Press enter to add skills"
                  />
                  <ChipContainer>
                    {jobDetails.skillsets.map((skill, index) => (
                      <ChipStyled
                        key={index}
                        label={skill}
                        onDelete={() => handleDeleteSkill(index)}
                      />
                    ))}
                  </ChipContainer>
                </Grid>
                <Grid item>
                  <CreateJobsTextField
                    select
                    label="Job Type"
                    variant="outlined"
                    value={jobDetails.jobType}
                    onChange={(event) => handleInput("jobType", event.target.value)}
                    fullWidth
                  >
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                    <MenuItem value="Work From Home">Work From Home</MenuItem>
                  </CreateJobsTextField>
                </Grid>
                <Grid item>
                  <CreateJobsTextField
                    select
                    label="Duration"
                    variant="outlined"
                    value={jobDetails.duration}
                    onChange={(event) => handleInput("duration", event.target.value)}
                    fullWidth
                  >
                    <MenuItem value={0}>Flexible</MenuItem>
                    <MenuItem value={1}>1 Month</MenuItem>
                    <MenuItem value={2}>2 Months</MenuItem>
                    <MenuItem value={3}>3 Months</MenuItem>
                    <MenuItem value={4}>4 Months</MenuItem>
                    <MenuItem value={5}>5 Months</MenuItem>
                    <MenuItem value={6}>6 Months</MenuItem>
                  </CreateJobsTextField>
                </Grid>
                <Grid item>
                  <CreateJobsTextField
                    label="Salary"
                    type="number"
                    variant="outlined"
                    value={jobDetails.salary}
                    onChange={(event) => handleInput("salary", event.target.value)}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <CreateJobsTextField
                    label="Application Deadline"
                    type="datetime-local"
                    value={jobDetails.deadline}
                    onChange={(event) => handleInput("deadline", event.target.value)}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <CreateJobsTextField
                    label="Maximum Number Of Applicants"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxApplicants}
                    onChange={(event) => handleInput("maxApplicants", event.target.value)}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <CreateJobsTextField
                    label="Positions Available"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxPositions}
                    onChange={(event) => handleInput("maxPositions", event.target.value)}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <CreateJobsButton
                variant="contained"
                onClick={handleUpdate}
              >
                Create Job
              </CreateJobsButton>
            </CreateJobsPaper>
          </Grid>
        </Grid>
      </Grid>
    </PopupDialog>
  );
};

export default CreateJobs;