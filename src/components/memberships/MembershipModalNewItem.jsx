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
  addNewEntity, 
  getAllCardtypesSelector, 
  getAllClientsSelector, 
  useStoreOfYogaClub
} from '../../store';

export const MembershipModalNewItem = ({openModalNewItem, handleCloseModalNewItem}) => {
  const initialData = {
    client_id: '',
    card_type_id: '',
    start_date: '',
    end_date: '',
    status: '',
  }

  const cardtypes = useStoreOfYogaClub(getAllCardtypesSelector);
  const clients = useStoreOfYogaClub(getAllClientsSelector);

  const [formClubcard, setFormClubcard] = React.useState(initialData);


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
    setFormClubcard(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const statuses = ['активный', 'средний', 'начальный', 'специальный'];

  const onChangeSubmit = (e) => {
    e.preventDefault();

    // console.log('formClubcard-----------------------------------');
    // console.log(formClubcard);

    addNewEntity('card_id', 'clubcards', formClubcard)
      .then( _ => { console.log(`+++++++ Запрос addNewEntity -- ClubcardModalNewItem успешно завершен!`)})
      .catch(error => { console.error(`------- ОШИБКА запроса addNewEntity -- ClubcardModalNewItem!`, error)});

    setFormClubcard(initialData);
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
            Новая карта клуба:           
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>

        

            <FormControl fullWidth margin="normal">
              <InputLabel id="client-select-label">Клиент</InputLabel>
              <Select
                labelId="client-select-label"
                name="client_id"
                value={formClubcard.client_id}
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
                value={formClubcard.card_type_id}
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
              label="Дата начала:"
              value={formClubcard.start_date}
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
              value={formClubcard.end_date}
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
                value={formClubcard.status}
                onChange={handleChange}
                label="Статус:"
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
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




/*


            <TextField
              fullWidth
              margin="normal"
              name="first_name"
              label="Имя:"
              value={formClubcard.first_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="last_name"
              label="Фамилия:"
              value={formClubcard.last_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="phone_number"
              label="Телефон:"
              type="tel"
              value={formClubcard.phone_number}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email:"
              type="email"
              value={formClubcard.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="date_of_birth"
              type="datetime-local"
              label="Дата рождения:"
              value={formClubcard.date_of_birth}
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
              value={formClubcard.registration_date}
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
                value={formClubcard.status}
                onChange={handleChange}
                label="Статус:"
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
             variant="contained" 
             sx={{ mt: 2 }}
             onClick={onChangeSubmit}
            >
              Отправить
            </Button>




*/










/*


import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardTypesPage } from '../pages/CardTypesPage';

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

const client = {
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
}

export const ClientModal = (options) => {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={options.open}
        onClose={options.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={options.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Client :
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {JSON.stringify(client)}
              <div>89797979798879</div>
              <div>89797979798879</div>
              <div>89797979798879</div>
              <CardTypesPage />
            </Typography>
          </Box>
        </Fade>
      </Modal>
  );
}import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardTypesPage } from '../pages/CardTypesPage';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


*/