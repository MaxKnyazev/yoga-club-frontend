import React from 'react';
import { Container, Typography } from '@mui/material';
import { useStoreOfYogaClub, getAllClientsSelector } from '../../store';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { deleteClient, editClient} from '../../store';
import { ClientModalNewItem } from './ClientModalNewItem';
import { ClientModalInfo } from './ClientModalInfo';
import FormControl from '@mui/material/FormControl';


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';





export const Clients = () => {
  const clients = useStoreOfYogaClub(getAllClientsSelector);

  const [currentClient, setCurrentClient] = React.useState({});

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




    editClient(client_id, putData)
      .then( _ => { console.log('+++++++ Запрос editClient успешно завершен!')})
      .catch(error => { console.error('------- ОШИБКА запроса editClient:', error)});

    
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
                <Fab size="small" aria-label="edit" sx={{backgroundColor: '#df87ee', zIndex: 0}}>
                  <EditIcon onClick={() => handleOpenEditBlock(client)}/>
                </Fab>
              </Tooltip>
              <Tooltip title="Удалить...">
                <Fab size="small" aria-label="delete" sx={{backgroundColor: '#ff9890', zIndex: 0}}>
                  <DeleteIcon onClick={
                    () => deleteClient(client.client_id)
                      .then( _ => { console.log('+++++++ Запрос deleteClient успешно завершен!')})
                      .catch(error => { console.error('------- ОШИБКА запроса deleteClient:', error)})
                
                  }/>
                </Fab>
              </Tooltip>
              <Tooltip title="Подробнее...">
                <Fab size="small" aria-label="send" sx={{backgroundColor: '#ffeb3b', zIndex: 0}}>
                  <SendIcon onClick={() => handleOpenModalInfo(client)}/>
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
