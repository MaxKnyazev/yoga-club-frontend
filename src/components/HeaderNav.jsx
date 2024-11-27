import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

const DRIVER_WIDTH = 240;
const navItems = [
  { page: 'Клиенты', to: '/clients'},
  { page: 'Инструкторы', to: '/instructors'},
  { page: 'Посещения', to: '/sessions'},
  { page: 'Карты', to: '/clubcards'},
  { page: 'Члены клуба', to: '/memberships'},
  { page: 'Типы карт', to: '/cardtypes'},
  { page: 'Членство', to: '/membershiptypes'},
  { page: 'Архив', to: '/logs'},
];

export const HeaderNav = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      <Link to='/'>
        <SelfImprovementIcon sx={{fill: '#1976d2', width: '68px', height: '68px'}}/>
      </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link to={item.to} key={item.page} style={{ textDecoration: 'none', color: '#1976d2'}}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.page} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>


          <Typography variant="h6" component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
          >
            <Link to='/'>
              <SelfImprovementIcon sx={{fill: '#ffffff', width: '68px', height: '68px'}}/>
            </Link>
          </Typography>








          

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              <NavLink 
                to={item.to} 
                key={item.page}
                style={({ isActive, isPending, isTransitioning }) => {
                  return {
                    fontWeight: isActive ? 'bold' : '',
                    color: isActive ? 'white' : '#c4e4fd',
                    textDecoration: 'none',
                    transition: 'color 200ms linear',
                    paddingLeft: '1rem',
                  };
                }}
              >
                <span>  {item.page}</span>
              </NavLink>
            ))}
          </Box>






        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRIVER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}




/*

import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function SvgIconChildren() {
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
        />
      </svg>
    </SvgIcon>
  );
}


          <svg 
          version="1.1" 
          id="Capa_1" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlns:xlink="http://www.w3.org/1999/xlink" 
          x="0px" 
          y="0px" 
          viewBox="0 0 57.991 57.991" 
          style="enable-background:new 0 0 57.991 57.991;" 
          xml:space="preserve">
          <path style="fill:#556080;" d="M28.995,50.241l1.413-9.695c1.256-8.623,9.265-16.631,17.887-17.887l9.695-1.413l-1.413,9.695 c-1.256,8.623-9.265,16.631-17.887,17.887L28.995,50.241z"/>
          <path style="fill:#7D6599;" d="M28.995,50.241L19.3,48.828c-8.623-1.256-16.631-9.265-17.887-17.887L0,21.245l9.695,1.413 c8.623,1.256,16.631,9.265,17.887,17.887L28.995,50.241z"/>
          <polygon style="fill:#8697CB;" points="28.995,49.265 28.819,49.027 28.919,49.718 28.993,49.75 28.995,49.73 28.998,49.75 29.072,49.718 29.172,49.027 "/>
          <path style="fill:#8697CB;" d="M20.919,20.077c-1.081-0.78-2.227-1.448-3.43-1.965l-9.254-4.315l-0.747,8.539l2.207,0.322 c3.43,0.5,6.755,2.08,9.604,4.33C19.476,24.591,20.023,22.239,20.919,20.077z"/>
          <path style="fill:#894B9D;" d="M49.755,13.797l-9.254,4.315c-1.203,0.518-2.349,1.185-3.43,1.965 c0.897,2.162,1.443,4.514,1.62,6.911c2.849-2.25,6.174-3.831,9.604-4.33l2.207-0.322L49.755,13.797z"/>
          <path style="fill:#ED7161;" d="M27.583,40.546l1.236,8.482l0.177,0.237l0.177-0.237l1.236-8.482 c0.757-5.192,3.97-10.15,8.283-13.557c-0.293-3.97-1.572-7.834-3.839-10.875L28.995,7.75l-5.857,8.364 c-2.268,3.041-3.546,6.905-3.839,10.875C23.613,30.395,26.826,35.353,27.583,40.546z"/>
          </svg>


*/
