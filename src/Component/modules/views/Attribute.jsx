import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import withRoot from '../withRoot';

import curvy from '../../../static/assets/productCurvyLines.png'
import p_values1 from '../../../static/assets/productValues1.svg'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};
const attribData =[
  {
      id: 1,
      title:"Helsinki Education Hub",
      logo: "",
      address: "Runeberginkatu 14-16, Helsinki, Southern Finland, 00100",
      location: "Helsinki, Finland",
      description: "Helsinki Education Hub was born from the need to bring education innovators together under one EdTech roof. With our founding partners (EdTech start-ups, investors, pedagogical experts, learners, researchers, corporations and public sector) we have opened a collaboration place for creating successful and innovative EdTech start-ups and innovations in Finland and globally.",
      url: "https://educationhubhelsinki.fi/fi/"
  },
  {
      id: 2,
      title:"Aalto Design Factory",
      logo: "",
      address: "Puumiehenkuja 5A, 02150 Espoo",
      location: "Espoo, Finland",
      description: "The Design Factory is an experimental learning and co-creation community for education, research and application of product design, and houses a versatile event space and a unique research and learning environment for product development.",
      url: "https://designfactory.aalto.fi/about/"
  },
  {
      id: 3,
      title:"University of Eastern Finland",
      logo: "",
      address: "Yliopistonranta 1, FI-70210 Kuopio, Finland",
      location: "Kuopio, Finland",
      description: "The University of Eastern Finland is a multidisciplinary university, which offers teaching in more than 100 major subjects. The university comprises four faculties: the Philosophical Faculty, the Faculty of Science and Forestry, the Faculty of Health Sciences, and the Faculty of Social Sciences and Business Studies.",
      url: "https://www.uef.fi/en"
  },
  {
      id: 4,
      title:"University of Helsinki (Helsinki Incubators)",
      logo: "",
      address: "P.O. Box 4 (Yliopistonkatu 3) 00014 University of Helsinki",
      location: "Helsinki, Finland",
      description: "Helsinki Incubators at the University of Helsinki is a network of pre-incubator and incubator programmes designed to give you the know-how and support needed to bring your idea to life.",
      url: "https://www.helsinki.fi/en/networks/helsinki-incubators"
  }
]


const Attribute = () => {
    return (
 <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >

      <Container sx={{ mt: 15, mb: 30, display: 'flex',  flexDirection:'column', position: 'relative' }}>
       
        <Box
          component="img"
          src={curvy}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
                <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          We would like to Attribute the following:-
        </Typography>
        <Grid container spacing={5}>
        {
        attribData.map(({id ,title,logo,address,location, description, url}) =>(
          <Grid item xs={12} md={4} key={id}>
          <Box sx={item}>
            <Box
              component="img"
              src={p_values1}
              alt="suitcase"
              sx={{ height: 55 }}
            />
            <Typography variant="h6" sx={{ my: 5 }}>
              {title}
            </Typography>
            <Typography variant="h5">
<p>{description}</p>
<p>📍{address } {' '} {location}</p>
<p>{url}</p>
            </Typography>
          </Box>
        </Grid>
        )
        ) 
}
          {/* <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={unsplash}
            
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5, textAlign:'left' }}>
                UnSplash Images
              </Typography>
              <Typography variant="h5">
                {
                  'The internet’s source for visuals.'
                  
                }

                {'Powered by creators everywhere.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={youtube}
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
               YouTube
              </Typography>
              <Typography variant="h5">
              {'By YouTube - https://www.youtube.com/, Public Domain, https://commons.wikimedia.org/w/index.php?curid=17740490'}
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
        {/* <Grid container spacing={5} sx={{mt:10, position:'relative'}}>
        <Box
          component="img"
          src={curvy}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', transform: 'scaleX(-1)', position: 'absolute', top: -200,left:-100 }}
        />
          <Grid item xs={12} md={4}>
            <Box sx={item  }>
              <Box
                component="img"
                src={p_values1}
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                FaceBook SVG
              </Typography>
              <Typography variant="h5">
<p>By Facebook Inc. - Investor Relations webpage of Facebook Inc., Annual Report 2017, Public Domain, https://commons.wikimedia.org/w/index.php?curid=70561573</p>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={unsplash}
            
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5, textAlign:'left' }}>
                UnSplash Images
              </Typography>
              <Typography variant="h5">
                {
                  'The internet’s source for visuals.'
                  
                }

                {'Powered by creators everywhere.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={youtube}
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
               YouTube
              </Typography>
              <Typography variant="h5">
              {'By YouTube - https://www.youtube.com/, Public Domain, https://commons.wikimedia.org/w/index.php?curid=17740490'}
              </Typography>
            </Box>
          </Grid>
        </Grid> */}
      </Container>
    </Box>
    );
};

export default withRoot(Attribute);