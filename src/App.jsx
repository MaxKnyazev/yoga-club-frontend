import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import useMediaQuery from '@mui/material/useMediaQuery';
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

  let routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/logs', element: <LogsPage />, },
        { path: '/cardtypes', element: <CardTypesPage />, },
        { path: '/clients', element: <ClientsPage />, },
        { path: '/sessions', element: <SessionsPage />, },
        { path: '/clubcards', element: <ClubCardsPage />, },
        { path: '/instructors', element: <InstructorsPage />, },
        { path: '/memberships', element: <MembershipsPage />, },
        { path: '/membershiptypes', element: <MembershipTypesPage />, },
        { path: '*', element: <NoMatch /> },
      ],
    },
  ];

  let element = useRoutes(routes);

  return (
    <Container maxWidth="lg">
      {element}
    </Container>
  );
}
