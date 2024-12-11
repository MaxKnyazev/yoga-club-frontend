import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { addNewEntity } from '../../store';

export const MembershiptypeModalNewItem = ({openModalNewItem, handleCloseModalNewItem}) => {
  const [formCardtype, setFormCardtype] = React.useState({
    type_name: '',
    sessions_allowed: '',
});

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
    setFormCardtype(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onChangeSubmit = (e) => {
    e.preventDefault();

    // console.log('formCardtype-----------------------------------');
    // console.log(formCardtype);

    addNewEntity('card_type_id', 'cardtypes', formCardtype)
      .then( _ => { console.log(`+++++++ Запрос addNewEntity -- CardtypeModalNewItem успешно завершен!`)})
      .catch(error => { console.error(`------- ОШИБКА запроса addNewEntity -- CardtypeModalNewItem!`, error)});

    setFormCardtype({
      card_type_name: '',
      price: '',
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
            Новый тип карты:           
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              name="card_type_name"
              label="Тип:"
              value={formCardtype.card_type_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="price"
              label="Цена:"
              type="number"
              value={formCardtype.price}
              onChange={handleChange}
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
