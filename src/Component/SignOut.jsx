import { Box,  Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg2 from '../static/assets/bg2.png'


const SignOut = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      setLoading(true);
      sessionStorage.clear();
      setLoading(false)
      await new Promise((resolve) => setTimeout(resolve, 3000)) 
      navigate("/");
    };
    signOut();
    
  }, [navigate]);
  return (
//   <div>
//       {loading ? (
//         <p>Signing out...</p> 
//       ) : (
//         <p>Successfully signed out!</p>
//       )}
//     </div>
<Container
component="section"
sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
>
{loading ? (<>
    <Typography variant="h4" component="span">
    Please hold while we sign you out
  </Typography>
</>):
(<>
 <Typography variant="h4" component="span">
 Successfully signed out!
  </Typography>
</>)
}

<Box
  component="img"
  src={bg2}
  alt="sad to see you leave"
  sx={{ width: 60 }}
/>
</Container>
  );
};

export default SignOut;
