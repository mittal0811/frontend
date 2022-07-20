import "./App.css";
import TextField from "@mui/material/TextField";

const InputWithLabel = ({ label, value, onChange }) => {
  return (
    <TextField
      fullWidth
      label={label}
      id={label}
      value={value}
      onChange={onChange}
    ></TextField>
  );
};

export default InputWithLabel;
