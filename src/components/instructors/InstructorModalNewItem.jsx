import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { addNewEntity } from '../../store';

export const InstructorModalNewItem = ({openModalNewItem, handleCloseModalNewItem}) => {
  const initialData = {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    specialization: '',
    experience_years: 0,
}
  const [formInstructor, setFormInstructor] = React.useState(initialData);

// {
//   "instructor_id": "6",
//   "first_name": "Алексей",
//   "last_name": "Лебедев",
//   "phone_number": "+7(912)715-87-90",
//   "email": "lebedev@example.com",
//   "specialization": "татж-йога",
//   "experience_years": 1,
//   "createdAt": "2024-10-16T13:32:02.000Z",
//   "updatedAt": "2024-10-16T13:32:05.000Z"
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
    setFormInstructor(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onChangeSubmit = (e) => {
    e.preventDefault();

    // console.log('formInstructor-----------------------------------');
    // console.log(formInstructor);
    
    addNewEntity('instructor_id', 'instructors', formInstructor)
      .then( _ => { console.log(`+++++++ Запрос addNewEntity -- InstructorModalNewItem успешно завершен!`)})
      .catch(error => { console.error(`------- ОШИБКА запроса addNewEntity -- InstructorModalNewItem!`, error)});
    
    setFormInstructor(initialData);
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
            Новый клиент:           
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              name="first_name"
              label="Имя:"
              value={formInstructor.first_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="last_name"
              label="Фамилия:"
              value={formInstructor.last_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="phone_number"
              label="Телефон:"
              type="tel"
              value={formInstructor.phone_number}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email:"
              type="email"
              value={formInstructor.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="specialization"
              label="Специализация:"
              value={formInstructor.specialization}
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
              name="experience_years"
              type="number"
              label="Кол.-во лет опыта:"
              value={formInstructor.experience_years}
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