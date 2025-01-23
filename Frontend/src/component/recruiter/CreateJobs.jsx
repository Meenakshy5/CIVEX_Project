import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid2,
  Typography,
  Modal,
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
});

const ChipContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '15px',
});

const ChipStyled = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
}));

const InputBox = styled(Box)({
  marginBottom: '20px',
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

  // Add the handleDeleteSkill function
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
      <Grid2
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh", width: "" }}
      >
        <Grid2 item>
          <Typography variant="h2">Add Job</Typography>
        </Grid2>
        <Grid2 item container xs direction="column" justify="center">
          <Grid2 item>
            <Paper
              style={{
                padding: "20px",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid2 container direction="column" alignItems="stretch" spacing={3}>
                <Grid2 item>
                  <TextField
                    label="Title"
                    value={jobDetails.title}
                    onChange={(event) => handleInput("title", event.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid2>
                <Grid2 item>
                  <TextField
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
                </Grid2>
                <Grid2 item>
                  <TextField
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
                  </TextField>
                </Grid2>
                <Grid2 item>
                  <TextField
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
                  </TextField>
                </Grid2>
                <Grid2 item>
                  <TextField
                    label="Salary"
                    type="number"
                    variant="outlined"
                    value={jobDetails.salary}
                    onChange={(event) => handleInput("salary", event.target.value)}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
                  />
                </Grid2>
                <Grid2 item>
                  <TextField
                    label="Application Deadline"
                    type="datetime-local"
                    value={jobDetails.deadline}
                    onChange={(event) => handleInput("deadline", event.target.value)}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    fullWidth
                  />
                </Grid2>
                <Grid2 item>
                  <TextField
                    label="Maximum Number Of Applicants"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxApplicants}
                    onChange={(event) => handleInput("maxApplicants", event.target.value)}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid2>
                <Grid2 item>
                  <TextField
                    label="Positions Available"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxPositions}
                    onChange={(event) => handleInput("maxPositions", event.target.value)}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid2>
              </Grid2>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px", marginTop: "30px" }}
                onClick={handleUpdate}
              >
                Create Job
              </Button>
            </Paper>
          </Grid2>
        </Grid2>
      </Grid2>
    </PopupDialog>
  );
};

export default CreateJobs;
