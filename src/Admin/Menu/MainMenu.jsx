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
import AddRoundedIcon from '@mui/icons-material/AddRounded';
  
  const MainMenu = ({ user }) => {
    const [userPic,setUserPic] = useState()
    const { updateUser } = useUser();


    useEffect(() =>{

    },[])
    
    const handleImageChange = () =>{
        setUserPic()
    }
    const rightLink = {
      fontSize: 16,
      color: "#BA68C8",
      fontWeight: "800",
    };
  
    return (
      <Container sx={{ width: "100%", minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center", marginBottom:'1rem' }}>
        <Stack spacing={3} sx={{ textAlign: "center" }}>
            <Box sx={{position:"relative", objectFit:'contain',  height: 200, width: 200, display:'flex'}}>
          <Box
            component="div"
            sx={{ height: 200,background:'none' , display:'flex', alignItems:'center', justifyContent:'center', width: 200, paddingTop: "6px", borderRadius: "50%", position:'absolute',zIndex:'2' }}
          >
            <p style={{background:'#0606066f', color:'white',borderRadius:'50%'}}>
            <label>
  <input
    type="file"
    accept="image/*"
    style={{ display: 'none' }} 
    onChange={handleImageChange}
    name="profilePic"
  />

  <AddRoundedIcon 
    sx={{ 
      fontSize: 60,
      color: 'white',
      backgroundColor: '#0606066f',
      borderRadius: '50%',
      padding: 1,
      cursor: 'pointer'
    }}
  />
</label>
                 </p>
          </Box>
           
            <Box
            component="img"
            src={`https://source.unsplash.com/1000x1000/?admin?auto=format&fit=crop&w=200`}
            alt="Ujuzi Logo"
            sx={{ height: 200, width: 200, paddingTop: "6px", borderRadius: "50%" , position:'absolute', zIndex:'1'}}
          />
            </Box>
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
  