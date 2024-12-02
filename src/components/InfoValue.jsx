import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

export const InfoValue = ({title, value}) => {
  return (
    <Grid container spacing={0} justifyContent={'space-between'}>
      <Grid
       display="flex"
       alignItems="center" 
       size={{ xs: 12, md: 5 }}
       sx={{borderBottom: '1px solid #1976d2'}}
      >
        <Typography variant="subtitle1"
          sx={{
            color: '#141414',
            fontSize: '1.2rem',
            pl: 1,
            fontWeight: 'bold',
          }}>
          {title}
        </Typography>
      </Grid>
      <Grid
       display="flex"
       alignItems="center" 
       size={{ xs: 12, md: 5 }}
       sx={{borderBottom: '1px solid #1976d2'}}
      >
        <Typography variant="subtitle1"
          sx={{
            color: '#141414',
            fontSize: '1.2rem',
            pl: 1,
          }}>
          {value}
        </Typography>
      </Grid>
  </Grid>
  )
}