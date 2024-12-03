import * as React from 'react';
import { useEffect } from 'react';
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
import Container from '@mui/material/Container';
import { getClients } from './store';

export const App = () => {

  useEffect(() => {
    getClients();
  }, []);

  const routes = [
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
