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
}