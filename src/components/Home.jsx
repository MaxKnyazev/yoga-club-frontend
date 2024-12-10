import React from 'react';
import { Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import yogaJpg from '../assets/jpg/yoga.jpg';
import Grow from '@mui/material/Grow';

export const Home = () => {
  return (
    <Container>
      <Typography variant="h5" sx={{
        textAlign: 'center', 
        textTransform: 'uppercase', 
        fontSize: { xs: '4rem', sm: '6rem', md: '8rem' }
      }}>
        Yoga
      </Typography>

      <Grow 
      in={true}
      style={{ transformOrigin: '0 0 0' }}
      {...{ timeout: 3000 }}
      >
        <Card sx={{ maxWidth: 1200 }}>
          <CardMedia
            sx={{ height: '50vh' }}
            image={yogaJpg}
            title="yoga-club"
          />
        </Card>
      </Grow>
      <Typography variant="h5" sx={{
        textAlign: 'center', 
        textTransform: 'uppercase', 
        fontSize: { xs: '4rem', sm: '6rem', md: '8rem' }
      }}>
        Club
      </Typography>
    </Container>
  );
};




/*

import useMediaQuery from '@mui/material/useMediaQuery';

export const SimpleMediaQuery = () => {
  const matches = useMediaQuery('(min-width:900px)'); // Если true, то ширина более 900 px
  const color = matches ? 'red':'blue';
  return <span style={{color}}>{`(min-width:900px) matches: ${matches}`}</span>;
}


      <Box sx={{ my: 4 }}>
        <SimpleMediaQuery />
      </Box>



*/
