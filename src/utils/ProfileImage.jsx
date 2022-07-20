import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import edit from "../images/edit.png";
import selfie from "../images/selfie.svg";

const ProfileImage = () => {
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid white`,
  }));

  const BigAvatar = styled(Avatar)(({ theme }) => ({
    width: 160,
    height: 160,
    border: `2px solid white`,
  }));

  const [selectedImage, setSelectedImage] = useState(null);

  const inputFileRef = useRef(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <SmallAvatar
            alt="demy Sharp"
            src={edit}
            onClick={() => {
              inputFileRef.current.click();
            }}
            style={{
              cursor: "pointer",
            }}
          ></SmallAvatar>
        }
      >
        <BigAvatar
          alt="Travis Howard"
          src={
            selectedImage === null ? selfie : URL.createObjectURL(selectedImage)
          }
        />
        <input
          ref={inputFileRef}
          type={"file"}
          style={{
            display: "none",
          }}
          onChange={(event) => {
            if (event.target?.files[0]) setSelectedImage(event.target.files[0]);
          }}
        ></input>
      </Badge>
    </div>
  );
};

export default ProfileImage;
