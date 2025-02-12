import React, { useState } from 'react';
import { Chip, TextField, Grid, Button } from '@mui/material';

const CustomChipInput = ({ label, value, onChange }) => {
  const [chipInput, setChipInput] = useState("");

  const handleAddChip = () => {
    if (chipInput.trim() !== "" && !value.includes(chipInput.trim())) {
      onChange([...value, chipInput.trim()]);
      setChipInput("");
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    onChange(value.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField
          label={label}
          variant="outlined"
          fullWidth
          value={chipInput}
          onChange={(e) => setChipInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleAddChip()}
        />
      </Grid>
      <Grid item container spacing={1}>
        {value.map((chip, index) => (
          <Grid item key={index}>
            <Chip
              label={chip}
              onDelete={() => handleDeleteChip(chip)}
            />
          </Grid>
        ))}
      </Grid>
      <Grid item>
        {/* <Button variant="outlined" onClick={handleAddChip}>
          Add Chip
        </Button> */}
      </Grid>
    </Grid>
  );
};

export default CustomChipInput;
