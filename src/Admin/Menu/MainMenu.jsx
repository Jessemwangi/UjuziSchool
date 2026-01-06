import {
  Alert,
  Box,
  Container,
  LinearProgress,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { server } from "../../UtilitiesFunctions/Function";
import axios from "axios";
import "./MainMenu.scss";
import Button from "../../Component/modules/components/Button";

const rightLink = {
  fontSize: 16,
  color: "#BA68C8",
  fontWeight: "800",
  textAlign: "center",
  paddingBottom: "0.5rem",
  paddingTop: "0.5rem",
  width: "100%",
  "&:hover": {
    color: "white",
    backgroundColor: "#040535",
  },
};

const MainMenu = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUser();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
    const showSnackbar = (message, severity = 'success') => {
      setSnackbar({ open: true, message, severity });
    };

  useEffect(() => {}, []);

  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      await postImageToStrapi(file);
    };

    reader.readAsDataURL(file);
    setLoading(false);
  };

  const postImageToStrapi = async (file) => {
    try {
      const data = new FormData();
      data.append("ref", "plugin::users-permissions.user");
      data.append("refId", user.id);
      data.append("field", "picId");
      data.append("files", file);
      const response = await axios.post(`${server}/upload/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      updateUser({
        ...user,
        profileUrl: response.data[0].url,
        picId: response.data[0].id,
      });
      return response.data[0].id;
    } catch (error) {
      console.error("Error uploading image:", error);
      const errMs = `Error uploading image: ${error.message}`;
      showSnackbar(errMs, 'error');
    }
  };

  const deleteProfilePic = async (uploadId) => {
    try {
      await axios.delete(`${server}/upload/${uploadId}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      updateUser({ ...user, profileUrl: null, picId: null });
      showSnackbar('Image deleted successfully', 'success');
    } catch (error) {
      const errMs = `Error deleting image: ${error.message}`;
      showSnackbar(errMs, 'error');
     
    } 

  };

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
          {loading ? (
            <LinearProgress color="secondary" />
          ) : (
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
                  className={
                    user?.profileUrl
                      ? "content_paragraph"
                      : "content_paragraph-normal"
                  }
                >
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      name="picId"
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
                src={
                  user?.profileUrl ||
                  `https://source.unsplash.com/1000x1000/?admin?auto=format&fit=crop&w=200`
                }
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
          )}
        </Box>
        <Button
          variant="contained"
          onClick={() => deleteProfilePic(user?.picId)}

          >
            delete Image
          </Button>
        <Typography
          variant="h5"
          sx={{ paddingBottom: "1rem", paddingTop: "3px" }}
        >
          {`Hello ${user?.firstname}`}
        </Typography>
        <Paper>
          <MenuList sx={{ width: 200, margin: "0 auto" }}>
            <MenuItem>
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/member/profile"
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
                href="/member/agent-registration"
                sx={{ ...rightLink }}
              >
                {"Register as Agent"}
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/member/admin/students"
                sx={{ ...rightLink }}
              >
                {"Manage Students"}
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/member/admin/student?reg=Create Account"
                sx={{ ...rightLink }}
              >
                {"Register Student"}
              </Link>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/member/admin/packages"
                sx={{ ...rightLink }}
              >
                {"View Packages"}
              </Link>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/member/admin/my-subscriptions"
                sx={{ ...rightLink }}
              >
                {"Active subscriptions"}
              </Link>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/member/admin/soon"
                sx={{ ...rightLink }}
              >
                {"Take a Test"}
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                variant="h7"
                underline="none"
                color="inherit"
                href="/sign-out"
                style={{ textAlign: "center", width: "100%" }}
              >
                {"Sign out"}
              </Link>
            </MenuItem>
          </MenuList>
        </Paper>
      </Stack>
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert 
                onClose={() => setSnackbar({ ...snackbar, open: false })} 
                severity={snackbar.severity}
                sx={{ width: '100%', borderRadius: 2 }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
    </Container>
  );
};

export default MainMenu;
