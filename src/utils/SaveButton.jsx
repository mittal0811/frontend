import { COLORS } from "../theme/colors";

const SaveButton = ({ updateDb }) => {
  return (
    <button
      style={{
        backgroundColor: COLORS.dark_orange,
        height: "40px",
        cursor: "pointer",
        borderRadius: 7,
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        border: 0,
        height: 30,
        width: 120,
      }}
      onClick={updateDb}
    >
      Save
    </button>
  );
};

export default SaveButton;
