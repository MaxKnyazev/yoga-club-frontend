import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { InfoValue } from '../InfoValue';

export const InstructorModalInfo = ({openModalInfo, handleCloseModalInfo, currentInstructor}) => { 
  const { first_name, last_name, phone_number, email, specialization, experience_years} = currentInstructor;

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
          Информация об инструкторе клуба
          </Typography> 
          <Box
           sx={{ 
            flexGrow: 1,
            paddingBottom: 1, 
          }}>
            <InfoValue title={'Имя:'} value={`${first_name}`} />
            <InfoValue title={'Фамилия:'} value={`${last_name}`} />
            <InfoValue title={'Телефон:'} value={`${phone_number}`} />
            <InfoValue title={'Email:'} value={`${email}`} />
            <InfoValue title={'Специализация:'} value={`${specialization}`} />
            <InfoValue title={'Кол.-во лет опыта'} value={`${experience_years}`} />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
