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
  import React, { useEffect } from "react";
import { useUser } from "../../hooks/UserContext";
  
  const MainMenu = ({ user }) => {
    const { updateUser } = useUser();

    useEffect(() =>{

    },[])
    const rightLink = {
      fontSize: 16,
      color: "#BA68C8",
      fontWeight: "800",
    };
  
    return (
      <Container sx={{ width: "100%", minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center", marginBottom:'1rem' }}>
        <Stack spacing={3} sx={{ textAlign: "center" }}>
          <Box
            component="img"
            src={`https://source.unsplash.com/1000x1000/?user?auto=format&fit=crop&w=200`}
            alt="Ujuzi Logo"
            sx={{ height: 200, width: 200, paddingTop: "6px", borderRadius: "50%" }}
          />
          <Typography variant="h5" sx={{ paddingBottom: "1rem", paddingTop: "3px" }}>
            {`Hello ${user?.user?.firstname}`}
          </Typography>
          <Paper>
            <MenuList sx={{ width: 200, margin: "0 auto" }}>
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
  