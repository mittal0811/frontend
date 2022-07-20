import { withStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { COLORS } from "../theme/colors";
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: COLORS.dark_orange,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: COLORS.dark_orange,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: COLORS.border_orange,
      },
      "&:hover fieldset": {
        borderColor: "grey",
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.dark_orange,
      },
    },
  },
})(TextField);

const InputWithLabel = ({ label, value, onChange, error }) => {
  return (
    <CssTextField
      fullWidth
      label={label}
      id={label}
      value={value}
      onChange={onChange}
      error={error ? true : false}
      helperText={error ? error : ""}
      style={{
        backgroundColor: "white",
        // border: `1px solid ${COLORS.border_orange}`,
        border: 0,

        borderRadius: 7,
      }}
    ></CssTextField>
  );
};

export default InputWithLabel;
