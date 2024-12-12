import React from 'react';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { 
  useStoreOfYogaClub, 
  getAllClubcardsSelector,
  getAllCardtypesSelector,
  getAllClientsSelector
} from '../../store';
import { deleteEntity, editEntity} from '../../store';
import { ClubcardModalNewItem } from './ClubcardModalNewItem';
import { ClubcardModalInfo } from './ClubcardModalInfo';

export const Clubcards = () => {
  const clubcards = useStoreOfYogaClub(getAllClubcardsSelector);
  const cardtypes = useStoreOfYogaClub(getAllCardtypesSelector);
  const clients = useStoreOfYogaClub(getAllClientsSelector);

  let _cards = [];
  for(let clubcard of clubcards) {
    for(const cardtype of cardtypes) {
      if(+clubcard.card_type_id === +cardtype.card_type_id) {
        clubcard = {...clubcard, card_type_name: cardtype.card_type_name}
        _cards.push(clubcard)
      }
    }
  }
  
  let __cards = [];
  for(let clubcard of _cards) {
    for(const client of clients) {
      if(+clubcard.client_id === +client.client_id) {
        clubcard = {...clubcard, client_name: `${client.first_name} ${client.last_name}`}
        __cards.push(clubcard)
      }
    }
  }


  // for(const clubcard of __cards) {
  //   console.log(clubcard);
  // }



  const [currentClubcard, setCurrentClubcard] = React.useState({});

  const [openModalNewItem, setOpenModalNewItem] = React.useState(false);
  const handleOpenModalNewItem = () => setOpenModalNewItem(true);
  const handleCloseModalNewItem = () => setOpenModalNewItem(false);
    const optionsModalNewItem = {
    openModalNewItem,
    handleCloseModalNewItem,
  }

  const [openModalInfo, setOpenModalInfo] = React.useState(false);
  const handleOpenModalInfo = (clubcard) => {
    setCurrentClubcard(clubcard);
    setOpenModalInfo(true);
  }
  const handleCloseModalInfo = () => setOpenModalInfo(false);
  const optionsModalInfo = {
    openModalInfo,
    handleCloseModalInfo,
    currentClubcard,
  }

  const [openModalEditItem, setOpenModalEditItem] = React.useState(false);
  const handleOpenModalEditItem = (clubcard) => {
    setCurrentClubcard(clubcard);
    setOpenModalEditItem(true);
  }
  const handleCloseModalEditItem = () => setOpenModalEditItem(false);
  const optionsModalEditItem = {
    openModalEditItem,
    handleCloseModalEditItem,
    currentClubcard,
  }

  // console.log('*************************************************************');

  const [formData, setFormData] = React.useState({});

  // console.log('formData');
  // console.log(formData);
  
  const [openEditBlock, setOpenEditBlock] = React.useState(false);
  const handleOpenEditBlock = (clubcard) => {
    console.log('handleOpenEditBlock  --> ', clubcard);
    setFormData({ ...formData, ...clubcard, });
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
    // console.log('data   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(data)
    const { card_id, updatedAt, createdAt, ...putData } = data;
    // console.log('client_id   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(client_id)
    // console.log('putData   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(putData)


// {
//   "card_id": "2",
//   "client_id": 1,
//   "card_type_id": 3,
//   "start_date": "2024-10-01T13:32:51.000Z",
//   "end_date": "2024-10-06T23:12:11.000Z",
//   "status": "активна",
//   "createdAt": "2024-10-01T13:32:51.000Z",
//   "updatedAt": "2024-10-06T23:12:11.000Z"
// }


// {
  // card_id
  // card_type_id
  // client_id
  
  // client_name
  // card_type_name
  // status
  // start_date
  // end_date
  
  // createdAt
  // updatedAt
// }


    editEntity(card_id, 'card_id', 'clubcards', putData)
      .then( _ => { console.log('+++++++ Запрос editEntity -- Clubcards успешно завершен!')})
      .catch(error => { console.error('------- ОШИБКА запроса editEntity -- Clubcards:', error)});

    setFormData({
      client_id: '',
      card_type_id: '',
      start_date: '',
      end_date: '',
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
 
  // const statuses = ['активный', 'средний', 'начальный', 'специальный'];

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
        Клубные карты
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
      { __cards.map((card) => (
        <Box key={card.card_id}
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
                {card.client_name}
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
                Тип: {card.card_type_name} Статус: {card.status}
              </Typography>
            </Grid>
            <Grid
             display="flex" 
             alignItems="center" 
             size={{ xs: 12, sm: 8, md: 10 }}
             sx={{borderBottom: '1px solid #1976d2'}}
            >
              <Typography variant="subtitle1" 
                sx={{
                  color: '#141414',
                  fontSize: '1rem',
                  pl: 1,
                }}>
                Дата начала: {card.start_date} Дата окончания: {card.end_date}
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
                  <EditIcon onClick={() => handleOpenEditBlock(card)}/>
                </Fab>
              </Tooltip>
              <Tooltip title="Удалить...">
                <Fab size="small" aria-label="delete" sx={{backgroundColor: '#ff9890', zIndex: 0}}>
                  <DeleteIcon onClick={
                    () => deleteEntity(card.card_id, 'card_id', 'clubcards')
                      .then( _ => { console.log('+++++++ Запрос deleteEntity -- Clubcards успешно завершен!')})
                      .catch(error => { console.error('------- ОШИБКА запроса deleteEntity -- Clubcards:', error)})

                  }/>
                </Fab>
              </Tooltip>
              <Tooltip title="Подробнее...">
                <Fab size="small" aria-label="send" sx={{backgroundColor: '#ffeb3b', zIndex: 0}}>
                  <SendIcon onClick={() => handleOpenModalInfo(card)}/>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}

      <ClubcardModalInfo {...optionsModalInfo}/>




      </Container>
    )
  };
  


  
/***
 * 
      { clubcards.map((client) => (
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
                    () => deleteEntity(client.client_id, 'client_id', 'clubcards')
                      .then( _ => { console.log('+++++++ Запрос deleteEntity -- Clubcards успешно завершен!')})
                      .catch(error => { console.error('------- ОШИБКА запроса deleteEntity -- Clubcards:', error)})

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

      <ClubcardModalNewItem {...optionsModalNewItem}/>
      <ClubcardModalInfo {...optionsModalInfo}/>

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