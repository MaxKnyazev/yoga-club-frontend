import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { 
  useStoreOfYogaClub, 
  getAllSessionsSelector,
  getAllClientsSelector,
  getAllInstructorsSelector,
  getAllMembershipsSelector,
  getAllClubcardsSelector,
  addNewEntity, 
} from '../../store';

export const SessionModalNewItem = ({openModalNewItem, handleCloseModalNewItem}) => {
  const initialData = {
    client_id: '',
    instructor_id: '',
    membership_id: null,
    card_id: null,
    visit_date: '',
    visit_type: '',
    isMembership: 'Нет',
    isClubcard: 'Нет',
}

  const sessions = useStoreOfYogaClub(getAllSessionsSelector);
  const clients = useStoreOfYogaClub(getAllClientsSelector);
  const instructors = useStoreOfYogaClub(getAllInstructorsSelector);
  const memberships = useStoreOfYogaClub(getAllMembershipsSelector);
  const clubcards = useStoreOfYogaClub(getAllClubcardsSelector);

  const [formSession, setFormSession] = React.useState(initialData);


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
  // isMembership
  
  // card_id
  // isClubcard

      // visit_date
      // visit_type
  
  //// createdAt
  //// updatedAt
// }


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
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormSession(prevData => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'client_id') {
      const selectedMembership = memberships.find(membership => membership.client_id === parseInt(value));
      if (selectedMembership) {
        setFormSession(prevData => ({
          ...prevData,
          membership_id: selectedMembership.memberships_id,
          isMembership: 'Да',
        }))
      
        console.log('selectedMembership.memberships_id   ', selectedMembership.memberships_id);
      };
      const selectedClubcard = clubcards.find(clubcard => clubcard.client_id === parseInt(value));
      if (selectedClubcard) {
        setFormSession(prevData => ({
          ...prevData,
          card_id: selectedClubcard.card_id,
          isClubcard: 'Да',
        }))
      
        console.log('selectedClubcard.card_id   ', selectedClubcard.card_id);
      };
    }
  };

  const types = ['индивидуальное занятие', 'занятие с инструктором', 'занятие цикла', 'другое'];

  const onChangeSubmit = (e) => {
    e.preventDefault();

    const {isMembership, isClubcard, ..._formSession} = formSession;

    // console.log('_formSession-----------------------------------');
    // console.log(_formSession);

    addNewEntity('session_id', 'sessions', _formSession)
      .then( _ => { console.log(`+++++++ Запрос addNewEntity -- SessionModalNewItem успешно завершен!`)})
      .catch(error => { console.error(`------- ОШИБКА запроса addNewEntity -- SessionModalNewItem!`, error)});

    setFormSession(initialData);
    handleCloseModalNewItem()
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModalNewItem}
      onClose={handleCloseModalNewItem}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModalNewItem}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Новое посещение клуба:           
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>

            <FormControl fullWidth margin="normal">
              <InputLabel id="client-select-label">Клиент</InputLabel>
              <Select
                labelId="client-select-label"
                name="client_id"
                value={formSession.client_id}
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
                value={formSession.instructor_id}
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
              value={formSession.visit_date}
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
                value={formSession.visit_type}
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
              value={formSession.isMembership}
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
              value={formSession.isClubcard}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <Button
             variant="contained" 
             sx={{ mt: 2 }}
             onClick={onChangeSubmit}
            >
              Отправить
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
