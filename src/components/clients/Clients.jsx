import React from 'react';
import { Container, Typography } from '@mui/material';
import { useStoreOfYogaClub, getAllClientsSelector } from '../../store';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import { deleteClient } from '../../store';
import { ClientModalNewItem } from './ClientModalNewItem';
import { ClientModalEditItem } from './ClientModalEditItem';
import { ClientModalInfo } from './ClientModalInfo';



export const Clients = () => {
  const clients = useStoreOfYogaClub(getAllClientsSelector);

  const [client, setClient] = React.useState({});

  const [openModalNewItem, setOpenModalNewItem] = React.useState(false);
  const handleOpenModalNewItem = () => setOpenModalNewItem(true);
  const handleCloseModalNewItem = () => setOpenModalNewItem(false);
  
  const optionsModalNewItem = {
    openModalNewItem,
    handleCloseModalNewItem,
  }

  const [openModalInfo, setOpenModalInfo] = React.useState(false);
  const handleOpenModalInfo = (client) => {
    setClient(client);
    setOpenModalInfo(true);
  }
  const handleCloseModalInfo = () => setOpenModalInfo(false);

  const optionsModalInfo = {
    openModalInfo,
    handleCloseModalInfo,
    client,
  }

  const [openModalEditItem, setOpenModalEditItem] = React.useState(false);
  const handleOpenModalEditItem = (client) => {
    setClient(client);//?????????????????????????????????????????
    setOpenModalEditItem(true);
  }
  const handleCloseModalEditItem = () => setOpenModalEditItem(false);

  const optionsModalEditItem = {
    openModalEditItem,
    handleCloseModalEditItem,
    client,
  }

  // const deleteClient = useStoreOfYogaClub((state) => state.deleteClient);
  // console.log('**********************');
  // console.log(deleteClient);
  // console.log(typeof deleteClient);
  // deleteClient(46);

  return (
    <Container>
      <Typography variant="h5" 
        sx={{
          textAlign: 'center', 
          textTransform: 'uppercase',
          color: '#141414',
          mb: 2,
        }}>
        Клиенты клуба
      </Typography>
      <Typography variant="h5" 
        sx={{
          textAlign: 'center', 
          mb: 2,
        }}>
        <Tooltip title="Добавить...">
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={handleOpenModalNewItem}/>
          </Fab>
        </Tooltip>
      </Typography>

      { clients.map((client) => (
        <Box key={client.client_id}
         sx={{ 
          flexGrow: 1,
          paddingBottom: 1, 
        }}>
          <Grid container spacing={0}>
            <Grid
             display="flex"
             alignItems="center" 
             size={{ xs: 12, sm: 8, md: 4 }}
             sx={{borderBottom: '1px solid #1976d2'}}
            >
              <Typography variant="subtitle1"
                sx={{
                  color: '#141414',
                  fontSize: '1.2rem',
                  pl: 1,
                  fontWeight: 'bold',
                }}>
                {client.first_name} {client.last_name}
              </Typography>
            </Grid>

            <Grid
             display="flex" 
             alignItems="center" 
             size={{ xs: 12, sm: 8, md: 6 }}
             sx={{borderBottom: '1px solid #1976d2'}}
            >
              <Typography variant="subtitle1" 
                sx={{
                  color: '#141414',
                  fontSize: '1rem',
                  pl: 1,
                }}>
                Тел.: {client.phone_number} Email: {client.email}
              </Typography>
            </Grid>

            <Grid
             display="flex" 
             justifyContent="space-around" 
             alignItems="center" 
             size={{ xs: 12, sm: 4, md: 2 }}
            >




              <Tooltip title="Изменить...">
                <Fab size="small" aria-label="edit" sx={{backgroundColor: '#df87ee'}}>
                  <EditIcon onClick={() => handleOpenModalEditItem(client)}/>
                </Fab>
              </Tooltip>




              <Tooltip title="Удалить...">
                <Fab size="small" aria-label="delete" sx={{backgroundColor: '#ff9890'}}>
                  <DeleteIcon onClick={() => deleteClient(client.client_id)}/>
                </Fab>
              </Tooltip>
              <Tooltip title="Подробнее...">
                <Fab size="small" aria-label="send" sx={{backgroundColor: '#ffeb3b'}}>
                  <SendIcon onClick={() => handleOpenModalInfo(client)}/>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}

      <ClientModalNewItem {...optionsModalNewItem}/>
      <ClientModalEditItem {...optionsModalEditItem}/>
      <ClientModalInfo {...optionsModalInfo}/>

    </Container>
  )
};





/*

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function FullWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1, border: '1px solid red' }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 8, md:5 }}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md:5 }}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md:2 }}>
          <Item>xs=6 md=4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
*/