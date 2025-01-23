import { TextField } from "@mui/material";

const EmailInput = (props) => {
  const {
    label,
    value,
    onChange,
    inputErrorHandler = {},
    handleInputError = () => {}, // Default to a no-op function
    required,
    className,
  } = props;

  const emailError = inputErrorHandler.email?.error || false;
  const emailMessage = inputErrorHandler.email?.message || "";

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      helperText={emailMessage}
      onBlur={(event) => {
        const inputValue = event.target.value;
        if (inputValue === "") {
          if (required) {
            handleInputError("email", true, "Email is required");
          } else {
            handleInputError("email", false, "");
          }
        } else {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(String(inputValue).toLowerCase())) {
            handleInputError("email", false, "");
          } else {
            handleInputError("email", true, "Incorrect email format");
          }
        }
      }}
      error={emailError}
      className={className}
    />
  );
};

export default EmailInput;
