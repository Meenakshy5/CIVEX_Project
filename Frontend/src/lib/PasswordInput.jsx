
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material"; // Removed the extra space
import Visibility from "@mui/icons-material/Visibility"; // Corrected path for Visibility icon
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Corrected path for VisibilityOff icon


const PasswordInput = (props) => {
  const { label, value, onChange, error, className, helperText, onBlur } = props;
  
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" error={error}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        value={value}
        onChange={onChange}
        className={className}
        onBlur={onBlur}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};


export default PasswordInput;
