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
  Pagination,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { makeStyles } from "@mui/styles";

import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";
import { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  button: {
    width: "100%",
    height: "100%",
    backgroundColor: "#355545",
    "&:hover": {
      backgroundColor: "#2a4538",
    },
  },
  jobTileOuter: {
    padding: "20px",
    margin: "10px",
    boxSizing: "border-box",
    width: "100%",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    },
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterPopup: {
    padding: "30px",
    outline: "none",
    minWidth: "50%",
    maxWidth: "600px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
  },
  filterSection: {
    marginBottom: "20px",
  },
  filterTitle: {
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#355545",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
}));

const JobTile = (props) => {
  const classes = useStyles();
  const { job } = props;
  const setPopup = useContext(SetPopupContext);

  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const handleApply = () => {
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        {
          sop: sop,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  const deadline = new Date(job.deadline).toLocaleDateString();

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{job.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Rating value={job.rating !== -1 ? job.rating : null} readOnly />
        </Grid>
        <Grid item xs={12}>
          Role: {job.jobType}
        </Grid>
        <Grid item xs={12}>
          Salary: ₹{job.salary} per month
        </Grid>
        <Grid item xs={12}>
          Duration: {job.duration !== 0 ? `${job.duration} months` : "Flexible"}
        </Grid>
        <Grid item xs={12}>
          Posted By: {job.recruiter.name}
        </Grid>
        <Grid item xs={12}>
          Application Deadline: {deadline}
        </Grid>
        <Grid item xs={12}>
          {job.skillsets.map((skill) => (
            <Chip label={skill} style={{ marginRight: "5px", marginBottom: "5px" }} />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setOpen(true)}
            disabled={userType() === "recruiter"}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "50%",
            alignItems: "center",
          }}
        >
          <TextField
            label="Write SOP (up to 250 words)"
            multiline
            rows={8}
            style={{ width: "100%", marginBottom: "30px" }}
            variant="outlined"
            value={sop}
            onChange={(event) => {
              if (
                event.target.value.split(" ").filter((n) => n !== "").length <= 250
              ) {
                setSop(event.target.value);
              }
            }}
          />
          <Button
            variant="contained"
            className={classes.button}
            style={{ padding: "10px 50px" }}
            onClick={handleApply}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Paper>
  );
};

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
      <Paper className={classes.filterPopup}>
        <Typography variant="h6" className={classes.filterTitle}>
          Filter Jobs
        </Typography>
        <Grid container spacing={3} className={classes.filterSection}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Job Type</Typography>
            <FormGroup>
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
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Salary</Typography>
            <Slider
              value={searchOptions.salary}
              onChange={(event, value) =>
                setSearchOptions({
                  ...searchOptions,
                  salary: value,
                })
              }
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Duration</Typography>
            <TextField
              select
              fullWidth
              value={searchOptions.duration}
              onChange={(event) =>
                setSearchOptions({
                  ...searchOptions,
                  duration: event.target.value,
                })
              }
            >
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="1">1 Month</MenuItem>
              <MenuItem value="2">2 Months</MenuItem>
              <MenuItem value="3">3 Months</MenuItem>
              <MenuItem value="4">4 Months</MenuItem>
              <MenuItem value="5">5 Months</MenuItem>
              <MenuItem value="6">6 Months</MenuItem>
              <MenuItem value="7">7 Months</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Sort By</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
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
                  onClick={() => {
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        salary: {
                          ...searchOptions.sort.salary,
                          desc: !searchOptions.sort.salary.desc,
                        },
                      },
                    });
                  }}
                >
                  {searchOptions.sort.salary.desc ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item xs={4}>
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
                  onClick={() => {
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        duration: {
                          ...searchOptions.sort.duration,
                          desc: !searchOptions.sort.duration.desc,
                        },
                      },
                    });
                  }}
                >
                  {searchOptions.sort.duration.desc ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item xs={4}>
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
                  onClick={() => {
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        rating: {
                          ...searchOptions.sort.rating,
                          desc: !searchOptions.sort.rating.desc,
                        },
                      },
                    });
                  }}
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              className={classes.button}
              style={{ padding: "10px 50px" }}
              onClick={() => {
                getData();
                handleClose();
              }}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

const Home = (props) => {
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
  const classes = useStyles();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [];
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
    if (searchOptions.salary[0] !== 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${searchOptions.salary[0] * 1000}`,
      ];
    }
    if (searchOptions.salary[1] !== 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${searchOptions.salary[1] * 1000}`,
      ];
    }
    if (searchOptions.duration !== "0") {
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
        setJobs(
          response.data.filter((obj) => {
            const today = new Date();
            const deadline = new Date(obj.deadline);
            return deadline > today;
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item container direction="column" alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2">Jobs</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
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
                    <IconButton onClick={() => getData()}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ width: "500px" }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton onClick={() => setFilterOpen(true)}>
              <FilterListIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container className={classes.gridContainer}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Grid item key={job._id}>
                <JobTile job={job} />
              </Grid>
            ))
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
        getData={getData}
      />
    </>
  );
};

export default Home;