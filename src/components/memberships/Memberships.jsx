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
  getAllMembershipsSelector,
  getAllMembershiptypesSelector,
  getAllClientsSelector
} from '../../store';
import { deleteEntity, editEntity} from '../../store';
import { MembershipModalNewItem } from './MembershipModalNewItem';
import { MembershipModalInfo } from './MembershipModalInfo';

export const Memberships = () => {
  const memberships = useStoreOfYogaClub(getAllMembershipsSelector);
  const membershiptypes = useStoreOfYogaClub(getAllMembershiptypesSelector);
  const clients = useStoreOfYogaClub(getAllClientsSelector);

  let _memberships = [];
  for(let membership of memberships) {
    for(const membershiptype of membershiptypes) {
      if(+membership.type_id === +membershiptype.type_id) {
        membership = {...membership, type_name: membershiptype.type_name}
        _memberships.push(membership)
      }
    }
  }
  
  let __memberships = [];
  for(let membership of _memberships) {
    for(const client of clients) {
      if(+membership.client_id === +client.client_id) {
        membership = {...membership, client_name: `${client.first_name} ${client.last_name}`}
        __memberships.push(membership)
      }
    }
  }


//......................................................................................
//......................................................................................
//......................................................................................
console.log('__memberships')
console.log(__memberships)


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
    // console.log('data   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(data)
    const { card_id, updatedAt, createdAt, card_type_name, client_name, ...putData } = data;
    // console.log('card_id   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(card_id)
    // console.log('putData   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(putData)


    // "memberships_id": "4",
    // "client_id": 3,
    // "type_id": 2,
    // "start_date": "2024-11-11T00:00:00.000Z",
    // "end_date": "2024-11-11T00:00:00.000Z",
    // "price": 200,
    // "sessions_used": 2,
    // "createdAt": "2024-11-11T13:07:00.571Z",
    // "updatedAt": "2024-11-11T13:07:00.571Z"


// {
  // memberships_id
  
  //// type_id
  //// type_name
  //// client_id
    // client_name

    // start_date
    // end_date
    // price
    // sessions_used
  
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
        Члены клуба
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





      </Container>
    )
  };
  


  /*

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
      <ClubcardModalNewItem {...optionsModalNewItem}/>

      { openEditBlock && 
        <>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Внесите изменения:           
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="client-select-label">Клиент</InputLabel>
                <Select
                  labelId="client-select-label"
                  name="client_id"
                  value={formData.client_id}
                  onChange={handleChange}
                  label="Клиент:"
                >
                  {clients.map((client) => (
                    <MenuItem 
                      key={client.client_id} 
                      value={client.client_id}
                    >
                    {client.first_name} {client.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="cards-select-label">Тип карты</InputLabel>
                <Select
                  labelId="cards-select-label"
                  name="card_type_id"
                  value={formData.card_type_id}
                  onChange={handleChange}
                  label="Тип карты:"
                >
                  {cardtypes.map((cardtype) => (
                    <MenuItem 
                      key={cardtype.card_type_name} 
                      value={cardtype.card_type_id}
                    >
                      {cardtype.card_type_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                name="start_date"
                type="datetime-local"
                label="Дата рождения:"
                value={(""+formData.start_date).substring(0, 19)}
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
                name="end_date"
                type="datetime-local"
                label="Дата начала:"
                value={(""+formData.end_date).substring(0, 19)}
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


  */