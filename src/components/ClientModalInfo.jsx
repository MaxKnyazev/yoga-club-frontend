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
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import { InfoValue } from './InfoValue';

// export const InfoValue = ({title, value}) => {
//   return (
//     <Grid container spacing={0} justifyContent={'space-between'}>
//       <Grid
//        display="flex"
//        alignItems="center" 
//        size={{ xs: 12, md: 5 }}
//        sx={{borderBottom: '1px solid #1976d2'}}
//       >
//         <Typography variant="subtitle1"
//           sx={{
//             color: '#141414',
//             fontSize: '1.2rem',
//             pl: 1,
//             fontWeight: 'bold',
//           }}>
//           {title}
//         </Typography>
//       </Grid>
//       <Grid
//        display="flex"
//        alignItems="center" 
//        size={{ xs: 12, md: 5 }}
//        sx={{borderBottom: '1px solid #1976d2'}}
//       >
//         <Typography variant="subtitle1"
//           sx={{
//             color: '#141414',
//             fontSize: '1.2rem',
//             pl: 1,
//           }}>
//           {value}
//         </Typography>
//       </Grid>
//   </Grid>
//   )
// }

export const ClientModalInfo = ({openInfo, handleCloseInfo}) => {

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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    // border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
  };
  
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData(prevData => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const names = ['Иван', 'Мария', 'Петр', 'Анна', 'Сергей'];

  // const onChangeSubmit = () => {
  //   console.log(formData);
  //   handleClose();
  // }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openInfo}
      onClose={handleCloseInfo}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openInfo}>
        <Box sx={style}>
          <Typography variant="h5" 
          sx={{
            textAlign: 'center', 
            textTransform: 'uppercase',
            color: '#141414',
            mb: 2,
          }}>
          Информация о клиенте клуба
          </Typography> 






          <Box
           sx={{ 
            flexGrow: 1,
            paddingBottom: 1, 
          }}>
            <InfoValue title={'Имя:'} value={`${client.first_name}`} />
            <InfoValue title={'Фамилия:'} value={`${client.last_name}`} />
            <InfoValue title={'Телефон:'} value={`${client.phone_number}`} />
            <InfoValue title={'Email:'} value={`${client.email}`} />
            <InfoValue title={'Дата рождения:'} value={`${client.date_of_birth}`} />
            <InfoValue title={'Дата регистрации:'} value={`${client.registration_date}`} />
            <InfoValue title={'Статус:'} value={`${client.status}`} />
          </Box>




        </Box>
      </Fade>
    </Modal>
  );
}




/*
 {client.last_name}

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
                <Fab size="small" aria-label="edit" sx={{backgroundColor: '#df87ee'}}>
                  <EditIcon onClick={() => console.log('clicked EditIcon ' + client.client_id)}/>
                </Fab>
              </Tooltip>
              <Tooltip title="Удалить...">
                <Fab size="small" aria-label="delete" sx={{backgroundColor: '#ff9890'}}>
                  <DeleteIcon onClick={() => deleteClient(client.client_id)}/>
                </Fab>
              </Tooltip>



              <Tooltip title="Подробнее...">
                <Fab size="small" aria-label="send" sx={{backgroundColor: '#ffeb3b'}}>
                  <SendIcon onClick={handleOpenInfo}/>
                </Fab>
              </Tooltip>



            </Grid>
          </Grid>
        </Box>



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