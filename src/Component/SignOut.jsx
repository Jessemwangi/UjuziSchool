import { Box,  Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg2 from '../static/assets/bg2.png'
import MessageInfo from "./modules/components/MessageInfo";


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
    <MessageInfo message="Please hold while we sign you out" show="false" backgroundColor={'#040535'} textColor={'#BA68C8'}>  
  </MessageInfo>
</>):
(<>
 <MessageInfo message=" Successfully signed out!" show="false" backgroundColor={'#040535'} textColor={'#BA68C8'}>  
  </MessageInfo>
 
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
