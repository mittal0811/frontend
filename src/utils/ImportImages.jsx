import canada from "../images/canada-2.svg";
import usa from "../images/united-states.svg";
import { COLORS } from "../theme/colors";

const countryTable = {
  0: { label: "USA", image: usa },
  1: { label: "Canada", image: canada },
};

const ImportImages = ({ countryid, country, setCountry }) => {
  const handleOnClick = () => {
    setCountry(countryid);
  };
  return (
    <div
      style={{
        width: "100",
        height: "100",
        backgroundColor: country === countryid ? COLORS.light_orange : "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 25,
        border:
          country === countryid
            ? `1px solid ${COLORS.dark_orange}`
            : `1px solid grey`,
        borderRadius: 7,
        marginRight: 10,
        cursor: "pointer",
        color: "grey",
      }}
      onClick={handleOnClick}
    >
      <img
        src={countryTable[countryid].image}
        style={{ marginBottom: 10 }}
      ></img>
      {countryTable[countryid].label}
    </div>
  );
};

export default ImportImages;
