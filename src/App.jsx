import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useRoutes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { ProductsCatalogPage } from './pages/ProductsCatalogPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { NoMatch } from './components/NoMatch';
import { Layout } from './components/Layout';
import { useEffect } from 'react';
import { useStoreOfProducts } from './store';
import { HomePage } from './pages/HomePage';




export const SimpleMediaQuery = () => {
  const matches = useMediaQuery('(min-width:600px)'); // Если true, то ширина более 600 px
  const color = matches ? 'red':'blue';
  return <span style={{color}}>{`(min-width:600px) matches: ${matches}`}</span>;
}



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
        { path: '/shoppingcart', element: <ShoppingCartPage />, },
        { path: '*', element: <NoMatch /> },
      ],
    },
  ];

  let element = useRoutes(routes);


  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <SimpleMediaQuery />
      </Box>

      {element}
    </Container>
  );
}
