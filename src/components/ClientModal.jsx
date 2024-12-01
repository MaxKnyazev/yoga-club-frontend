import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { CardTypesPage } from '../pages/CardTypesPage';//+
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export const ClientModal = (options) => {
  const [formData, setFormData] = React.useState({
    textField1: '',
    textField2: '',
    dateTime: '',
    selectedName: '',
  });
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const names = ['Иван', 'Мария', 'Петр', 'Анна', 'Сергей'];

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
            Client Form
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              name="textField1"
              label="Text Field 1"
              value={formData.textField1}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="textField2"
              label="Text Field 2"
              value={formData.textField2}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="dateTime"
              label="Date and Time"
              type="datetime-local"
              value={formData.dateTime}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="name-select-label">Select Name</InputLabel>
              <Select
                labelId="name-select-label"
                name="selectedName"
                value={formData.selectedName}
                onChange={handleChange}
                label="Select Name"
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" sx={{ mt: 2 }}>Submit</Button>
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
  border: '2px solid #000',
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