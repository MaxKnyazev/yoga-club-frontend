import React from 'react';
import { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

export const SimpleMediaQuery = () => {
  const matches = useMediaQuery('(min-width:900px)'); // Если true, то ширина более 900 px
  const color = matches ? 'red':'blue';
  return <span style={{color}}>{`(min-width:900px) matches: ${matches}`}</span>;
}

export const Home = () => {
  // useEffect(() => {
  //   getClients();
  // }, []);


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

/*


import { useEffect } from 'react';
// import { useStoreOfProducts } from './store';

import { useRoutes } from 'react-router-dom';
import { NoMatch } from './components/NoMatch';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LogsPage } from './pages/LogsPage';
import { CardTypesPage } from './pages/CardTypesPage';
import { ClientsPage } from './pages/ClientsPage';
import { SessionsPage } from './pages/SessionsPage';
import { ClubCardsPage } from './pages/ClubCardsPage';
import { InstructorsPage } from './pages/InstructorsPage';
import { MembershipsPage } from './pages/MembershipsPage';
import { MembershipTypesPage } from './pages/MembershipTypesPage';

export const App = () => {
  // const loadFromSessionStorage = useStoreOfProducts(state => state.loadFromSessionStorage);
  // useEffect(() => {
  //   if (loadFromSessionStorage) {
  //     loadFromSessionStorage();
  //   }
  // }, [loadFromSessionStorage]);



*/



/**
 * 
 * 
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

 * 
 */