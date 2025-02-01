import { useState, useContext } from "react";
import { Button, TextField, LinearProgress, Box } from "@mui/material"; // Using Box
import { CloudUpload } from "@mui/icons-material";
import Axios from "axios";
import { SetPopupContext } from "../App";

const FileUploadInput = ({ uploadTo, identifier, handleInput, className, icon, label }) => {
  const setPopup = useContext(SetPopupContext);

  const [file, setFile] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  // Handle file selection
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setUploadPercentage(0);
    setFile(selectedFile);
  };
 
  // Handle file upload
  const handleUpload = () => {
    if (!file) return;
  
    const data = new FormData();
    data.append("file", file);
  
    Axios.post(uploadTo, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add the token here
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total));
      },
    })
      .then((response) => {
        console.log(response.data);
        handleInput(identifier, response.data.url);
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message || "Upload successful",
        });
      })
      .catch((err) => {
        console.error(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.statusText || "Upload failed",
        });
      });
  };

  return (
    <Box className={className} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            sx={{ width: "100%", height: "100%" }}
          >
            {icon}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </Button>
        </Box>
        <Box sx={{ flex: 2, padding: "0 10px" }}>
          <TextField
            label={label}
            value={file ? file.name : ""}
            InputProps={{ readOnly: true }}
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "100%", height: "100%" }}
            onClick={handleUpload}
            disabled={!file}
          >
            <CloudUpload />
          </Button>
        </Box>
      </Box>

      {uploadPercentage > 0 && (
        <Box sx={{ marginTop: "10px" }}>
          <LinearProgress variant="determinate" value={uploadPercentage} />
        </Box>
      )}
    </Box>
  );
};

export default FileUploadInput;
