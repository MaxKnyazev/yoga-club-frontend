import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { InfoValue } from '../InfoValue';

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


export const MembershipModalInfo = ({openModalInfo, handleCloseModalInfo, currentMembership}) => { 
  const { client_name, type_name, price, start_date, end_date, sessions_used} = currentMembership;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModalInfo}
      onClose={handleCloseModalInfo}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModalInfo}>
        <Box sx={style}>
          <Typography variant="h5" 
          sx={{
            textAlign: 'center', 
            textTransform: 'uppercase',
            color: '#141414',
            mb: 2,
          }}>
          Информация о картах клуба
          </Typography> 
          <Box
           sx={{ 
            flexGrow: 1,
            paddingBottom: 1, 
          }}>
            <InfoValue title={'ФИО клиента:'} value={`${client_name}`} />
            <InfoValue title={'Тип членства:'} value={`${type_name}`} />
            <InfoValue title={'Цена:'} value={`${price}`} />
            <InfoValue title={'Дата начала:'} value={`${start_date}`} />
            <InfoValue title={'Дата окончания:'} value={`${end_date}`} />
            <InfoValue title={'Кол.-во отработанных занятий:'} value={`${sessions_used}`} />
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