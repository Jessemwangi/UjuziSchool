import {
  Box,
  Container,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { postData, server } from "../../UtilitiesFunctions/Function";
import axios from "axios";
import Snackbar from "../../Component/modules/components/Snackbar";

const rightLink = {
  fontSize: 16,
  color: "#BA68C8",
  fontWeight: "800",
  textAlign:'center',
paddingBottom:'0.5rem',
paddingTop:'0.5rem',
width:'100%',
"&:hover": {
  color: "white",
  backgroundColor: "#040535"
}
};

const MainMenu = ({ user }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUser();
  console.log(user);

  useEffect(() => {}, []);

  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const posting = await postImageToStrapi(file);
      console.log(posting)
    };

    reader.readAsDataURL(file);
    setLoading(false);
  };

  const postImageToStrapi = async (file) => {
      try {
       
      const data = new FormData();
      data.append("ref", "plugin::users-permissions.user");
      data.append("refId", user.id);
      data.append("field", "profilePic");
        data.append("files", file);
        const response = await axios.post(`${server}/upload/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.jwt}`,
          },
        });
        console.log(response);
        //   setPicUpload(response.data[0].id);
        updateUser({ ...user,profileUrl:response.data[0].url, profilePic:response.data[0].id });
        setProfilePic(response.data[0].url)
        return response.data[0].id;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
     };

const deleteProfilePic = async (uploadId) =>{

}

  return (
    <Container
      sx={{
        width: "100%",
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <Stack spacing={3} sx={{ textAlign: "center" }}>
        <Box
          sx={{
            position: "relative",
            objectFit: "contain",
            height: 200,
            width: 200,
            display: "flex",
          }}
        >
{ 
loading ? 
(
<p><Snackbar/></p>
)
:
(    user?.profileUrl ?
     (<>
         <Box
        component="img"
        src={user?.profileUrl}
        alt={user.firstname}
        sx={{
          height: 200,
          width: 200,
          paddingTop: "6px",
          borderRadius: "50%",
          position: "absolute",
          zIndex: "1",
        }}
       
      />
                    <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
              name="profilePic"
            />
     </>
        
      ):
      (
      <>
        <Box
        component="div"
        sx={{
          height: 200,
          background: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 200,
          paddingTop: "6px",
          borderRadius: "50%",
          position: "absolute",
          zIndex: "2",
        }}
      >
        <p
          style={{
            background: "#0606066f",
            color: "white",
            borderRadius: "50%",
          }}
        >
          <label>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
              name="profilePic"
            />

            <AddRoundedIcon
              sx={{
                fontSize: 60,
                color: "white",
                backgroundColor: "#0606066f",
                borderRadius: "50%",
                padding: 1,
                cursor: "pointer",
              }}
            />
          </label>
        </p>
      </Box>

      <Box
        component="img"
        src={`https://source.unsplash.com/1000x1000/?admin?auto=format&fit=crop&w=200`}
        alt="Ujuzi Logo"
        sx={{
          height: 200,
          width: 200,
          paddingTop: "6px",
          borderRadius: "50%",
          position: "absolute",
          zIndex: "1",
        }}
      />
      </>
      )
      )
}

        </Box>
        <Typography
          variant="h5"
          sx={{ paddingBottom: "1rem", paddingTop: "3px" }}
        >
          {`Hello ${user?.firstname}`}
        </Typography>
        <Paper>
          <MenuList  sx={{ width: 200, margin: "0 auto" }}>
            <MenuItem>
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/member/admin/profile"
                sx={{ ...rightLink }}
              >
                {"Profile"}
              </Link>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/member/admin/video"
                sx={{ ...rightLink }}
              >
                {"My Videos"}
              </Link>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/"
                sx={{ ...rightLink }}
              >
                {"My Games"}
              </Link>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/"
                sx={{ ...rightLink }}
              >
                {"My Units"}
              </Link>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/"
                sx={{ ...rightLink }}
              >
                {"Take a Test"}
              </Link>
            </MenuItem>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Paper>
      </Stack>
    </Container>
  );
};

export default MainMenu;
