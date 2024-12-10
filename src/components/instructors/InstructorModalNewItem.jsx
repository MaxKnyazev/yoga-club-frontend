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
import { addNewClient } from '../../store';

export const ClientModalNewItem = ({openModalNewItem, handleCloseModalNewItem}) => {
  const [formClient, setFormClient] = React.useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    date_of_birth: '',
    registration_date: '',
    status: '',
});

  //     {
  //       "client_id": "1",
  //       "first_name": "Иван",
  //       "last_name": "Петров",
  //       "phone_number": "+7(920)753-89-56",
  //       "email": "ivan@mail.ru",
  //       "date_of_birth": "2024-10-01T13:32:51.000Z",
  //       "registration_date": "2024-10-08T13:32:58.000Z",
  //       "status": "активный",
  //       "createdAt": "2024-10-16T13:32:02.000Z",
  //       "updatedAt": "2024-10-16T13:32:05.000Z"
  //     },

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
    setFormClient(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const statuses = ['активный', 'средний', 'начальный', 'специальный'];

  const onChangeSubmit = (e) => {
    e.preventDefault();



    // Проверка валидности полей
    /************************************ */
    //TODO: Условие на отправку формы ???
    /************************************ */
    console.log('formClient-----------------------------------');
    console.log(formClient);

    addNewClient(formClient)
      .then( _ => { console.log('+++++++ Запрос addNewClient успешно завершен!')})
      .catch(error => { console.error('------- ОШИБКА запроса addNewClient:', error)});


    setFormClient({
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      date_of_birth: '',
      registration_date: '',
      status: '',
    })
    handleCloseModalNewItem();
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
            Новый клиент:           
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              name="first_name"
              label="Имя:"
              value={formClient.first_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="last_name"
              label="Фамилия:"
              value={formClient.last_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="phone_number"
              label="Телефон:"
              type="tel"
              value={formClient.phone_number}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email:"
              type="email"
              value={formClient.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="date_of_birth"
              type="datetime-local"
              label="Дата рождения:"
              value={formClient.date_of_birth}
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
              value={formClient.registration_date}
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
                value={formClient.status}
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