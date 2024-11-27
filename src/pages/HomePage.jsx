import React from 'react';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

export const SimpleMediaQuery = () => {
  const matches = useMediaQuery('(min-width:900px)'); // Если true, то ширина более 900 px
  const color = matches ? 'red':'blue';
  return <span style={{color}}>{`(min-width:900px) matches: ${matches}`}</span>;
}

export const HomePage = () => {
  return (
    <Container>
      <Typography variant="h5" sx={{textAlign: 'center', textTransform: 'uppercase'}}>
        Главная страница
      </Typography>

      <Box sx={{ my: 4 }}>
        <SimpleMediaQuery />
      </Box>
    </Container>
  );
};
