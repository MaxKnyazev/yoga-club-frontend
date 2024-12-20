import React from 'react';
import { Container, Typography } from '@mui/material';
import { useStoreOfYogaClub, getAllClientsSelector } from '../../store';
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { deleteEntity, editEntity} from '../../store';
import { ClientModalNewItem } from './ClientModalNewItem';
import { ClientModalInfo } from './ClientModalInfo';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Error } from '../Error';

export const Clients = () => {
  const clients = useStoreOfYogaClub(getAllClientsSelector);

  const [currentClient, setCurrentClient] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');

  const [openModalNewItem, setOpenModalNewItem] = React.useState(false);
  const handleOpenModalNewItem = () => setOpenModalNewItem(true);
  const handleCloseModalNewItem = () => setOpenModalNewItem(false);
  
  const optionsModalNewItem = {
    openModalNewItem,
    handleCloseModalNewItem,
  }

  const [openModalInfo, setOpenModalInfo] = React.useState(false);
  const handleOpenModalInfo = (client) => {
    setCurrentClient(client);
    setOpenModalInfo(true);
  }
  const handleCloseModalInfo = () => setOpenModalInfo(false);

  const optionsModalInfo = {
    openModalInfo,
    handleCloseModalInfo,
    currentClient,
  }

  const [openModalEditItem, setOpenModalEditItem] = React.useState(false);
  const handleOpenModalEditItem = (client) => {
    setCurrentClient(client);//?????????????????????????????????????????
    setOpenModalEditItem(true);
  }
  const handleCloseModalEditItem = () => setOpenModalEditItem(false);

  const optionsModalEditItem = {
    openModalEditItem,
    handleCloseModalEditItem,
    currentClient,
  }

  // console.log('*************************************************************');

  const [formData, setFormData] = React.useState({});

  console.log('formData');
  console.log(formData);
  
  const [openEditBlock, setOpenEditBlock] = React.useState(false);
  const handleOpenEditBlock = (client) => {
    console.log('handleOpenEditBlock  --> ', client);
    setFormData({ ...formData, ...client, });
    setOpenEditBlock(true);
  }

  const onCancel = () => {
    setOpenEditBlock(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSubmit = (data) => {
    // e.preventDefault();
    // Проверка валидности полей
    //TODO: Условие на отправку формы ???

    //TODO: Код отправки формы ??? **********************************************

    // console.log('data   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(data)
    const { client_id, updatedAt, createdAt, ...putData } = data;
    // console.log('client_id   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(client_id)
    // console.log('putData   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(putData)



    editEntity(client_id, 'client_id', 'clients', putData)
      .then( _ => { console.log('+++++++ Запрос editEntity -- Clients успешно завершен!')})
      .catch(error => { console.error('------- ОШИБКА запроса editEntity -- Clients:', error)});

    // editClient(client_id, putData)
    //   .then( _ => { console.log('+++++++ Запрос editClient успешно завершен!')})
    //   .catch(error => { console.error('------- ОШИБКА запроса editClient:', error)});

    
    setFormData({
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      date_of_birth: '',
      registration_date: '',
      status: '',
    });

    setOpenEditBlock(false)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };
 
  const statuses = ['активный', 'средний', 'начальный', 'специальный'];

  // console.log('*************************************************************');

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
          <Fab color="primary" aria-label="add" sx={{zIndex: 0}}>
            <AddIcon onClick={handleOpenModalNewItem}/>
          </Fab>
        </Tooltip>
      </Typography>

      {errorMessage && <Error setErrorMessage={setErrorMessage} errorMessage={`${errorMessage}`}/>}
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
                <Fab 
                  size="small" 
                  aria-label="edit" 
                  sx={{backgroundColor: '#df87ee', zIndex: 0}}
                  onClick={() => handleOpenEditBlock(client)}
                >
                  <EditIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Удалить...">
                <Fab 
                  size="small" 
                  aria-label="delete" 
                  sx={{backgroundColor: '#ff9890', zIndex: 0}}
                  onClick={
                    () => deleteEntity(client.client_id, 'client_id', 'clients')
                      .then( _ => { console.log('+++++++ Запрос deleteEntity -- Clients успешно завершен!')})
                      .catch(error => { 
                        console.error('------- ОШИБКА запроса deleteEntity -- Clients:', error);
                        setErrorMessage(error)
                      })

                  }
                >
                  <DeleteIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Подробнее...">
                <Fab 
                  size="small" 
                  aria-label="send" 
                  sx={{backgroundColor: '#ffeb3b', zIndex: 0}}
                  onClick={() => handleOpenModalInfo(client)}
                >
                  <SendIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}

      <ClientModalNewItem {...optionsModalNewItem}/>
      <ClientModalInfo {...optionsModalInfo}/>

      { openEditBlock && 
        <>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Внесите изменения:           
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
      
              <TextField
                fullWidth
                margin="normal"
                name="first_name"
                label="Имя:"
                value={formData.first_name}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                name="last_name"
                label="Фамилия:"
                value={formData.last_name}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                name="phone_number"
                label="Телефон:"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                name="email"
                label="Email:"
                type="email"
                value={formData.email}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                name="date_of_birth"
                type="datetime-local"
                label="Дата рождения:"
                // value="2024-02-21T05:12:01.455Z"
                value={(""+formData.date_of_birth).substring(0, 19)}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                name="registration_date"
                type="datetime-local"
                label="Дата регистрации:"
                // value="2024-02-21T05:12"
                value={(""+formData.registration_date).substring(0, 19)}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-select-label">Статус</InputLabel>
                <Select
                  labelId="status-select-label"
                  name="status"
                  // value="активный"
                  value={formData.status}
                  onChange={handleChange}
                  label="Статус:"
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Button
                 variant="contained" 
                 sx={{ mt: 2 }}
                 onClick={() => onChangeSubmit(formData)}
                >
                  Отправить
                </Button>
                <Button
                 variant="contained" 
                 sx={{ mt: 2 }}
                 onClick={onCancel}
                >
                  Отменить
                </Button>
                
              </Box>
            </Box>
          </Box>
         </>
      }
      </Container>
    )
  };
  


  
/***
 * 
 * import * as React from 'react';

// export const ClientModalEditItem = ({client}) => { 
export const ClientModalEditItem = ({openModalEditItem, handleCloseModalEditItem, client}) => { 

  console.log('client')
  console.log(client)

  const [formData, setFormData] = React.useState(client);

  console.log('formData');
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно выполнить действия с данными формы, например, отправить на сервер
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
      </form>
  );
};
 * 
 */





  // <ClientModalEditItem {...{...optionsModalEditItem, client:{ first_name: client.first_name}}}/>
  // <ClientModalEditItem {...{...optionsModalEditItem, client: {...client}}}/>
  
  
  
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