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
  getAllSessionsSelector,
  getAllClientsSelector,
  getAllInstructorsSelector,
  getAllMembershipsSelector,
  getAllClubcardsSelector,
} from '../../store';
import { deleteEntity, editEntity} from '../../store';
import { SessionModalNewItem } from './SessionModalNewItem';
import { SessionModalInfo } from './SessionModalInfo';
import { Error } from '../Error';




//.....................................................................................
//.....................................................................................
//.....................................................................................
//.....................................................................................
//.....................................................................................
//..................................................................<Error />
//..................................................................Fab




export const Sessions = () => {
  const sessions = useStoreOfYogaClub(getAllSessionsSelector);
  const clients = useStoreOfYogaClub(getAllClientsSelector);
  const instructors = useStoreOfYogaClub(getAllInstructorsSelector);
  const memberships = useStoreOfYogaClub(getAllMembershipsSelector);
  const clubcards = useStoreOfYogaClub(getAllClubcardsSelector);

  let _sessions = [];
  for(let session of sessions) {
    for(const client of clients) {
      if(+session.client_id === +client.client_id) {
        session = {...session, client_name: `${client.first_name} ${client.last_name}`}
        _sessions.push(session)
      }
    }
  }

  let __sessions = [];
  for(let session of _sessions) {
    for(const instructor of instructors) {
      if(+session.instructor_id === +instructor.instructor_id) {
        session = {...session, instructor_name: `${instructor.first_name} ${instructor.last_name}`}
        __sessions.push(session)
      }
    }
  }

// console.log('__sessions')
// console.log(__sessions)

  const [errorMessage, setErrorMessage] = React.useState('');

  const [currentSession, setCurrentSession] = React.useState({});

  const [openModalNewItem, setOpenModalNewItem] = React.useState(false);
  const handleOpenModalNewItem = () => setOpenModalNewItem(true);
  const handleCloseModalNewItem = () => setOpenModalNewItem(false);
    const optionsModalNewItem = {
    openModalNewItem,
    handleCloseModalNewItem,
  }

  const [openModalInfo, setOpenModalInfo] = React.useState(false);
  const handleOpenModalInfo = (session) => {
    setCurrentSession(session);
    setOpenModalInfo(true);
  }
  const handleCloseModalInfo = () => setOpenModalInfo(false);
  const optionsModalInfo = {
    openModalInfo,
    handleCloseModalInfo,
    currentSession,
  }

  const [openModalEditItem, setOpenModalEditItem] = React.useState(false);
  const handleOpenModalEditItem = (session) => {
    setCurrentSession(session);
    setOpenModalEditItem(true);
  }
  const handleCloseModalEditItem = () => setOpenModalEditItem(false);
  const optionsModalEditItem = {
    openModalEditItem,
    handleCloseModalEditItem,
    currentSession,
  }

  // console.log('*************************************************************');

  const [formData, setFormData] = React.useState({});

  // console.log('formData');
  // console.log(formData);
  
  const [openEditBlock, setOpenEditBlock] = React.useState(false);
  const handleOpenEditBlock = (session) => {
    console.log('handleOpenEditBlock  --> ', session);
    setFormData({ ...formData, ...session, });
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
    const { session_id, updatedAt, createdAt, instructor_name, client_name, isMembership, isClubcard, ...putData } = data;

    // console.log('card_id   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(card_id)
    // console.log('putData   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(putData)


      // "session_id": "6",
      // "client_id": 1,
      // "instructor_id": 6,
      // "visit_date": "2024-12-14T07:17:10.000Z",
      // "membership_id": 8,
      // "card_id": 3,
      // "visit_type": "00000000000000000",
      // "createdAt": "2024-12-14T07:16:52.000Z",
      // "updatedAt": "2024-12-14T07:16:55.000Z"



// {
  //// session_id
  
  // client_id
  // client_name f + l
  
  // instructor_id
  // instructor_name f + l
  
  // membership_id
  // ?????????????????????????? true/false?
  
  // card_id
  // ?????????????????????????? true/false?

      // visit_date
      // visit_type
  
  //// createdAt
  //// updatedAt
// }


    editEntity(session_id, 'session_id', 'sessions', putData)
      .then( _ => { console.log('+++++++ Запрос editEntity -- Sessions успешно завершен!')})
      .catch(error => { console.error('------- ОШИБКА запроса editEntity -- Sessions:', error)});

    setFormData({
      client_id: '',
      instructor_id: '',
      membership_id: '',
      card_id: '',
      visit_date: '',
      visit_type: '',
      isMembership: 'Нет',
      isClubcard: 'Нет',
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

  const types = ['индивидуальное занятие', 'занятие с инструктором', 'занятие цикла', 'другое'];

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
        Посещения клуба
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
      { __sessions.map((session) => {

        session.isMembership = 'Нет';  
        for(const membership of memberships) {
          if(+session.client_id === +membership.client_id) {
            session.isMembership = 'Да';
            break
          }
        }

        session.isClubcard = 'Нет';  
        for(const clubcard of clubcards) {
          if(+session.client_id === +clubcard.client_id) {
            session.isClubcard = 'Да';
            break
          }
        }
        return (
        <Box key={session.session_id}
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
                {session.client_name}
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
                Дата: {session.visit_date} Инструктор: {session.instructor_name}
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
                Тип визита: {session.visit_type} Членство клуба: {session.isMembership} Карта клуба: {session.isClubcard}
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
                  onClick={() => handleOpenEditBlock(session)}
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
                    () => deleteEntity(session.session_id, 'session_id', 'sessions')
                      .then( _ => { console.log('+++++++ Запрос deleteEntity -- Sessions успешно завершен!')})
                      .catch(error => { 
                        console.error('------- ОШИБКА запроса deleteEntity -- Sessions:', error);
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
                  onClick={() => handleOpenModalInfo(session)}
                >
                  <SendIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      )})}

      <SessionModalInfo {...optionsModalInfo}/>
      <SessionModalNewItem {...optionsModalNewItem}/>

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
              <InputLabel id="instructor-select-label">Инструктор</InputLabel>
              <Select
                labelId="instructor-select-label"
                name="instructor_id"
                value={formData.instructor_id}
                onChange={handleChange}
                label="Инструктор:"
              >
                {instructors.map((instructor) => (
                  <MenuItem 
                    key={instructor.instructor_id} 
                    value={instructor.instructor_id}
                  >
                  {instructor.first_name} {instructor.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              name="visit_date"
              type="datetime-local"
              label="Дата визита:"
              value={(""+formData.visit_date).substring(0, 19)}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="types-select-label">Тип визита</InputLabel>
              <Select
                labelId="types-select-label"
                name="visit_type"
                value={formData.visit_type}
                onChange={handleChange}
                label="Тип визита:"
              >
                {types.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              disabled
              margin="normal"
              name="isMembership"
              label="Член клуба:"
              value={formData.isMembership}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              fullWidth
              disabled
              margin="normal"
              name="isClubcard"
              label="Карта клуба:"
              value={formData.isClubcard}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
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


  /*




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
                <InputLabel id="membershiptype-select-label">Тип карты</InputLabel>
                <Select
                  labelId="membershiptype-select-label"
                  name="type_id"
                  value={formData.type_id}
                  onChange={handleChange}
                  label="Тип карты:"
                >
                  {membershiptypes.map((membershiptype) => (
                    <MenuItem 
                      key={membershiptype.type_id} 
                      value={membershiptype.type_id}
                    >
                      {membershiptype.type_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                name="start_date"
                type="datetime-local"
                label="Дата начала:"
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
                label="Дата окончания:"
                value={(""+formData.end_date).substring(0, 19)}
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
                name="price"
                type="number"
                label="Цена:"
                value={formData.price}
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
                name="sessions_used"
                type="number"
                label="Кол.-во отработанных занятий:"
                value={formData.sessions_used}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />


    // client_id
  // client_name f + l
  
  // instructor_id
  // instructor_name f + l
  
  // membership_id
  // ?????????????????????????? true/false?
  
  // card_id
  // ?????????????????????????? true/false?

      // visit_date
      // visit_type


      { __memberships.map((membership) => (
        <Box key={membership.memberships_id}
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
                {membership.client_name}
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
                Тип: {membership.type_name} Цена: {membership.price}
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
                Дата начала: {membership.start_date} Дата окончания: {membership.end_date}
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
                  onClick={() => handleOpenEditBlock(membership)}
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
                    () => deleteEntity(membership.memberships_id, 'memberships_id', 'memberships')
                      .then( _ => { console.log('+++++++ Запрос deleteEntity -- Memberships успешно завершен!')})
                      .catch(error => { 
                        console.error('------- ОШИБКА запроса deleteEntity -- Memberships:', error);
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
                  onClick={() => handleOpenModalInfo(membership)}
                >
                  <SendIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}

      <MembershipModalInfo {...optionsModalInfo}/>
      <MembershipModalNewItem {...optionsModalNewItem}/>

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
                <InputLabel id="membershiptype-select-label">Тип карты</InputLabel>
                <Select
                  labelId="membershiptype-select-label"
                  name="type_id"
                  value={formData.type_id}
                  onChange={handleChange}
                  label="Тип карты:"
                >
                  {membershiptypes.map((membershiptype) => (
                    <MenuItem 
                      key={membershiptype.type_id} 
                      value={membershiptype.type_id}
                    >
                      {membershiptype.type_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                name="start_date"
                type="datetime-local"
                label="Дата начала:"
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
                label="Дата окончания:"
                value={(""+formData.end_date).substring(0, 19)}
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
                name="price"
                type="number"
                label="Цена:"
                value={formData.price}
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
                name="sessions_used"
                type="number"
                label="Кол.-во отработанных занятий:"
                value={formData.sessions_used}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
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