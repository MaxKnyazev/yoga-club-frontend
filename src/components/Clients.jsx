import React from 'react';
import { Container, Typography } from '@mui/material';
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

const data = {
  "result": [
    {
      "client_id": "1",
      "first_name": "Иван",
      "last_name": "Петров",
      "phone_number": "+7(920)753-89-56",
      "email": "ivan@mail.ru",
      "date_of_birth": "2024-10-01T13:32:51.000Z",
      "registration_date": "2024-10-08T13:32:58.000Z",
      "status": "активный",
      "createdAt": "2024-10-16T13:32:02.000Z",
      "updatedAt": "2024-10-16T13:32:05.000Z"
    },
    {
      "client_id": "2",
      "first_name": "Марк",
      "last_name": "Ливанов",
      "phone_number": "+7(997)363-27-55",
      "email": "livanov.mark@mail.com",
      "date_of_birth": "2024-10-01T13:32:51.000Z",
      "registration_date": "2024-10-08T13:32:58.000Z",
      "status": "активный",
      "createdAt": "2024-10-16T13:32:02.000Z",
      "updatedAt": "2024-10-16T13:32:05.000Z"
    },
    {
      "client_id": "4",
      "first_name": "Анна",
      "last_name": "Сидорова",
      "phone_number": "+7(987)654-32-10",
      "email": "sidorova.anna@gmail.com",
      "date_of_birth": "2024-10-01T13:32:51.000Z",
      "registration_date": "2024-10-08T13:32:58.000Z",
      "status": "активный",
      "createdAt": "2024-10-16T13:32:02.000Z",
      "updatedAt": "2024-10-16T13:32:05.000Z"
    },
    {
      "client_id": "3",
      "first_name": "Елена2 ",
      "last_name": "Вольская",
      "phone_number": "+7(912)345-67-89",
      "email": "volskaya@mail.com",
      "date_of_birth": "2024-10-01T13:32:51.000Z",
      "registration_date": "2024-10-08T13:32:58.000Z",
      "status": null,
      "createdAt": "2024-10-16T13:32:02.000Z",
      "updatedAt": "2024-10-16T13:32:05.000Z"
    },
    {
      "client_id": "46",
      "first_name": "F00000000",
      "last_name": "L000000000000",
      "phone_number": "+7(777) 111-11-22",
      "email": "test@test.com",
      "date_of_birth": "2023-10-01T02:32:51.000Z",
      "registration_date": "2024-10-01T02:32:51.000Z",
      "status": "active",
      "createdAt": "2024-11-06T08:14:02.455Z",
      "updatedAt": "2024-11-06T09:05:41.232Z"
    },
    {
      "client_id": "41",
      "first_name": "F00000000",
      "last_name": "L000000000000",
      "phone_number": "+7(777) 111-11-22",
      "email": "test@test.com",
      "date_of_birth": "2023-10-01T02:32:51.000Z",
      "registration_date": "2024-10-01T02:32:51.000Z",
      "status": "active",
      "createdAt": "2024-10-16T13:32:02.000Z",
      "updatedAt": "2024-11-06T09:16:53.985Z"
    }
  ],
  "error": ""
}

export const Clients = () => {

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
            <AddIcon onClick={() => console.log('clicked AddIcon')}/>
          </Fab>
        </Tooltip>
      </Typography>

      {data.result.map((client) => (
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
                  <EditIcon onClick={() => console.log('clicked EditIcon ' + client.client_id)}/>
                </Fab>
              </Tooltip>
              <Tooltip title="Удалить...">
                <Fab size="small" aria-label="delete" sx={{backgroundColor: '#ff9890'}}>
                  <DeleteIcon onClick={() => console.log('clicked DeleteIcon ' + client.client_id)}/>
                </Fab>
              </Tooltip>
              <Tooltip title="Подробнее...">
                <Fab size="small" aria-label="send" sx={{backgroundColor: '#ffeb3b'}}>
                  <SendIcon onClick={() => console.log('clicked SendIcon ' + client.client_id)}/>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}

    </Container>
  );
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