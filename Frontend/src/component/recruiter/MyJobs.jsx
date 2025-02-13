import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { styled } from "@mui/system";

import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";

// Styled Components
const MyJobsContainer = styled("div")({
  padding: "30px",
  minHeight: "93vh",
  backgroundColor: "#f5f5f5",
});

const JobTileOuter = styled(Paper)({
  padding: "30px",
  margin: "30px",
  marginLeft:"120px",
  boxSizing: "border-box",
  width: "500px", // Fixed width for the job box
  height: "550px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(53, 85, 69, 0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  });

const FilterPopupPaper = styled(Paper)({
  padding: "30px",
  outline: "none",
  minWidth: "40%", // Smaller dialog box
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(53, 85, 69, 0.1)",
});

const ApplyButton = styled(Button)({
  padding: "10px 50px",
  backgroundColor: "#355545",
  color: "white",
  "&:hover": {
    backgroundColor: "#2a4538",
  },
});

const FilterButton = styled(IconButton)({
  color: "#355545",
});

const SearchTextField = styled(TextField)({
  width: "500px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#355545",
    },
    "&:hover fieldset": {
      borderColor: "#2a4538",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#355545",
    },
  },
});

const ViewApplicationsButton = styled(Button)({
  backgroundColor: "#355545",
  color: "white",
  "&:hover": {
    backgroundColor: "#2a4538",
  },
  width: "100%",
  padding: "10px",
});

const UpdateButton = styled(Button)({
  backgroundColor: "#4a6b5f", // Darker shade of #355545
  color: "white",
  "&:hover": {
    backgroundColor: "#3a554a", // Even darker shade
  },
  width: "100%",
  padding: "10px",
});

const DeleteButton = styled(Button)({
  backgroundColor: "#d32f2f",
  color: "white",
  "&:hover": {
    backgroundColor: "#b71c1c",
  },
  width: "100%",
  padding: "10px",
});

const JobTile = (props) => {
  const navigate = useNavigate();
  const { job, getData } = props;
  const setPopup = useContext(SetPopupContext);

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [jobDetails, setJobDetails] = useState(job);

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleClick = (location) => {
    navigate(location);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${apiList.jobs}/${job._id}`, {
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
        getData();
        handleClose();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  const handleJobUpdate = () => {
    axios
      .put(`${apiList.jobs}/${job._id}`, jobDetails, {
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
        getData();
        handleCloseUpdate();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleCloseUpdate();
      });
  };

  const postedOn = new Date(job.dateOfPosting);

  return (
    <JobTileOuter elevation={3}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h5">{job.title}</Typography>
        </Grid>
        <Grid item>
          <Rating value={job.rating !== -1 ? job.rating : null} readOnly />
        </Grid>
        <Grid item>Role : {job.jobType}</Grid>
        <Grid item>Salary : &#8377; {job.salary} per month</Grid>
        <Grid item>
          Duration : {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
        </Grid>
        <Grid item>Date Of Posting: {postedOn.toLocaleDateString()}</Grid>
        <Grid item>Number of Applicants: {job.maxApplicants}</Grid>
        <Grid item>
          Remaining Number of Positions:{" "}
          {job.maxPositions - job.acceptedCandidates}
        </Grid>
        <Grid item>
          {job.skillsets.map((skill, index) => (
            <Chip key={index} label={skill} style={{ marginRight: "2px" }} />
          ))}
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={2} style={{ marginTop: "auto" }}>
        <Grid item>
          <ViewApplicationsButton
            variant="contained"
            onClick={() => handleClick(`/job/applications/${job._id}`)}
          >
            View Applications
          </ViewApplicationsButton>
        </Grid>
        <Grid item>
          <UpdateButton variant="contained" onClick={() => setOpenUpdate(true)}>
            Update Details
          </UpdateButton>
        </Grid>
        <Grid item>
          <DeleteButton variant="contained" onClick={() => setOpen(true)}>
            Delete Job
          </DeleteButton>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <FilterPopupPaper>
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Are you sure?
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </Grid>
            <Grid item>
              <ViewApplicationsButton onClick={handleClose}>Cancel</ViewApplicationsButton>
            </Grid>
          </Grid>
        </FilterPopupPaper>
      </Modal>
      <Modal open={openUpdate} onClose={handleCloseUpdate}>
        <FilterPopupPaper>
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Update Details
          </Typography>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                label="Application Deadline"
                type="datetime-local"
                value={jobDetails.deadline.substr(0, 16)}
                onChange={(event) => handleInput("deadline", event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Maximum Number Of Applicants"
                type="number"
                value={jobDetails.maxApplicants}
                onChange={(event) => handleInput("maxApplicants", event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Positions Available"
                type="number"
                value={jobDetails.maxPositions}
                onChange={(event) => handleInput("maxPositions", event.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={2} style={{ marginTop: "20px" }}>
            <Grid item>
              <UpdateButton onClick={handleJobUpdate}>Update</UpdateButton>
            </Grid>
            <Grid item>
              <ViewApplicationsButton onClick={handleCloseUpdate}>Cancel</ViewApplicationsButton>
            </Grid>
          </Grid>
        </FilterPopupPaper>
      </Modal>
    </JobTileOuter>
  );
};

const FilterPopup = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    <Modal open={open} onClose={handleClose}>
      <FilterPopupPaper>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Job Type
            </Grid>
            <Grid container item xs={9} justifyContent="space-around">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="fullTime"
                      checked={searchOptions.jobType.fullTime}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Full Time"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="partTime"
                      checked={searchOptions.jobType.partTime}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Part Time"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="wfh"
                      checked={searchOptions.jobType.wfh}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Work From Home"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Salary
            </Grid>
            <Grid item xs={9}>
              <Slider
                value={searchOptions.salary}
                onChange={(event, value) =>
                  setSearchOptions({
                    ...searchOptions,
                    salary: value,
                  })
                }
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => value * 1000}
                min={0}
                max={100}
              />
            </Grid>
          </Grid>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Duration
            </Grid>
            <Grid item xs={9}>
              <TextField
                select
                label="Duration"
                value={searchOptions.duration}
                onChange={(event) =>
                  setSearchOptions({
                    ...searchOptions,
                    duration: event.target.value,
                  })
                }
                fullWidth
              >
                <MenuItem value="0">All</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Sort
            </Grid>
            <Grid container item xs={9} spacing={2}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="salary"
                      checked={searchOptions.sort.salary.status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            salary: {
                              ...searchOptions.sort.salary,
                              status: event.target.checked,
                            },
                          },
                        })
                      }
                    />
                  }
                  label="Salary"
                />
                <IconButton
                  disabled={!searchOptions.sort.salary.status}
                  onClick={() =>
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        salary: {
                          ...searchOptions.sort.salary,
                          desc: !searchOptions.sort.salary.desc,
                        },
                      },
                    })
                  }
                >
                  {searchOptions.sort.salary.desc ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="duration"
                      checked={searchOptions.sort.duration.status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            duration: {
                              ...searchOptions.sort.duration,
                              status: event.target.checked,
                            },
                          },
                        })
                      }
                    />
                  }
                  label="Duration"
                />
                <IconButton
                  disabled={!searchOptions.sort.duration.status}
                  onClick={() =>
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        duration: {
                          ...searchOptions.sort.duration,
                          desc: !searchOptions.sort.duration.desc,
                        },
                      },
                    })
                  }
                >
                  {searchOptions.sort.duration.desc ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rating"
                      checked={searchOptions.sort.rating.status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            rating: {
                              ...searchOptions.sort.rating,
                              status: event.target.checked,
                            },
                          },
                        })
                      }
                    />
                  }
                  label="Rating"
                />
                <IconButton
                  disabled={!searchOptions.sort.rating.status}
                  onClick={() =>
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        rating: {
                          ...searchOptions.sort.rating,
                          desc: !searchOptions.sort.rating.desc,
                        },
                      },
                    })
                  }
                >
                  {searchOptions.sort.rating.desc ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ApplyButton onClick={() => getData()}>Apply</ApplyButton>
          </Grid>
        </Grid>
      </FilterPopupPaper>
    </Modal>
  );
};

const MyJobs = (props) => {
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  });

  const setPopup = useContext(SetPopupContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [`myjobs=1`];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [...searchParams, `jobType=Full%20Time`];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [...searchParams, `jobType=Part%20Time`];
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`];
    }
    if (searchOptions.salary[0] != 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${searchOptions.salary[0] * 1000}`,
      ];
    }
    if (searchOptions.salary[1] != 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${searchOptions.salary[1] * 1000}`,
      ];
    }
    if (searchOptions.duration != "0") {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`];
    }

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    let address = apiList.jobs;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <MyJobsContainer>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="h2" style={{ color: "#355545" }}>
            My Jobs
          </Typography>
        </Grid>
        <Grid item>
          <SearchTextField
            label="Search Jobs"
            value={searchOptions.query}
            onChange={(event) =>
              setSearchOptions({
                ...searchOptions,
                query: event.target.value,
              })
            }
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                getData();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FilterButton onClick={() => setFilterOpen(true)}>
                    <FilterListIcon />
                  </FilterButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Grid>
        <Grid
          container
          item
          spacing={3}
          justifyContent={jobs.length === 1 ? "center" : "flex-start"}
        >
          {jobs.length > 0 ? (
            jobs.map((job) => <JobTile key={job._id} job={job} getData={getData} />)
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No jobs found
            </Typography>
          )}
        </Grid>
      </Grid>
      <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={() => {
          getData();
          setFilterOpen(false);
        }}
      />
    </MyJobsContainer>
  );
};

export default MyJobs;