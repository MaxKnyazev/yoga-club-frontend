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

// openModalEditItem,
// handleCloseModalEditItem,
// client,

export const ClientModalEditItem = ({openModalEditItem, handleCloseModalEditItem, curentClient}) => { 
  
  // const [loading, setLoading] = React.useState(false);

  // console.log('client')
  // console.log(client)

  client = {
    first_name: '11111',
    last_name: '222222',
    phone_number: '3333333',
    email: '444@555.66',
    date_of_birth: '2024-02-12T13:32:51',
    registration_date: '2024-02-12T13:32:51',
    status: 'активный',
};

  const [formClient, setFormClient] = React.useState(curentClient);

  // console.log('formClient')
  // console.log(formClient)

  // const [formClient, setFormClient] = React.useState({
  //   first_name: client.first_name,
  //   last_name: '',
  //   phone_number: '',
  //   email: '',
  //   date_of_birth: '',
  //   registration_date: '',
  //   status: '',
  // })

// setTimeout(() => {
//   setFormClient({...client})
// }, 1000);

  
//   const [formClient, setFormClient] = React.useState({
//     // first_name: client.first_name,
//     // last_name: client.last_name,
//     // phone_number: client.phone_number,
//     // email: client.email,
//     // date_of_birth: client.date_of_birth,
//     // registration_date: client.registration_date,
//     // status: client.status,
// });

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
    // console.log(`----------- name = ${name} --------- value = ${value}`)
    setFormClient(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleInputChange = (event) => {
  //   setFormClient({...formClient, [event.target.name]: event.target.value });
  // };


  const statuses = ['активный', 'средний', 'начальный', 'специальный'];



  const onChangeSubmit = () => {

    // Проверка валидности полей
    //TODO: Условие на отправку формы ???
    setFormClient({
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      date_of_birth: '',
      registration_date: '',
      status: '',
    })
    // console.log('formClient**************************************');
    // console.log(formClient);
    handleCloseModalEditItem();
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModalEditItem}
      onClose={handleCloseModalEditItem}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModalEditItem}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Внесите изменения:           
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
              value="2024-02-21T05:12"
              // value={formClient.date_of_birth}
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
                value="активный"
                // value={formClient.status}
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





/***
 * 
 * import * as React from 'react';

// export const ClientModalEditItem = ({client}) => { 
export const ClientModalEditItem = ({openModalEditItem, handleCloseModalEditItem, client}) => { 

  console.log('client')
  console.log(client)

  const [formData, setFormData] = React.useState(client);

  console.log('formData');
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно выполнить действия с данными формы, например, отправить на сервер
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
      </form>
  );
};
 * 
 */


