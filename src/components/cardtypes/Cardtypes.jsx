import React from 'react';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useStoreOfYogaClub, getAllCardtypesSelector } from '../../store';
// import { deleteClient, editClient} from '../../store';
import { CardtypeModalNewItem } from './CardtypeModalNewItem';





export const Cardtypes = () => {
  const cardtypes = useStoreOfYogaClub(getAllCardtypesSelector);

  //..........................................................................................................
  const [currentCardtype, setCurrentCardtype] = React.useState({});

  const [openModalNewItem, setOpenModalNewItem] = React.useState(false);
  const handleOpenModalNewItem = () => setOpenModalNewItem(true);
  const handleCloseModalNewItem = () => setOpenModalNewItem(false);
  
  const optionsModalNewItem = {
    openModalNewItem,
    handleCloseModalNewItem,
  }

  // console.log('*************************************************************');

  const [openModalEditItem, setOpenModalEditItem] = React.useState(false);
  const handleOpenModalEditItem = (cardtype) => {
    setCurrentCardtype(cardtype);//?????????????????????????????????????????
    setOpenModalEditItem(true);
  }
  const handleCloseModalEditItem = () => setOpenModalEditItem(false);

  const optionsModalEditItem = {
    openModalEditItem,
    handleCloseModalEditItem,
    currentCardtype,
  }

  // console.log('*************************************************************');

  const [formData, setFormData] = React.useState({});

  console.log('formData');
  console.log(formData);
  
  const [openEditBlock, setOpenEditBlock] = React.useState(false);
  const handleOpenEditBlock = (cardtype) => {
    console.log('handleOpenEditBlock  --> ', cardtype);
    setFormData({ ...formData, ...cardtype, });
    setOpenEditBlock(true);
  }

  const onCancel = () => {
    setOpenEditBlock(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSubmit = (data) => {
    // e.preventDefault();
    // Проверка валидности полей


    // {
    //   "card_type_id": "1",
    //   "card_type_name": "бюджетная",
    //   "price": 10000,
    //   "createdAt": "2024-10-16T13:32:02.000Z",
    //   "updatedAt": "2024-10-16T13:32:05.000Z"
    // }

    // console.log('data   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(data)
    const { card_type_id, updatedAt, createdAt, ...putData } = data;
    // console.log('client_id   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(client_id)
    // console.log('putData   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(putData)



  //TODO:..........................................................................................................
    editClient(client_id, putData)
      .then( _ => { console.log('+++++++ Запрос editClient успешно завершен!')})
      .catch(error => { console.error('------- ОШИБКА запроса editClient:', error)});

  //TODO:..........................................................................................................  
    setFormData({
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      date_of_birth: '',
      registration_date: '',
      status: '',
    });

    setOpenEditBlock(false)
  }

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
 
  // const statuses = ['активный', 'средний', 'начальный', 'специальный'];

  // console.log('*************************************************************');

  return (
    <Container>
      <Typography variant="h5" 
        sx={{
          textAlign: 'center', 
          textTransform: 'uppercase',
          color: '#141414',
          mb: 2,
        }}>
        Типы клубных карт
      </Typography>
      <Typography variant="h5" 
        sx={{
          textAlign: 'center', 
          mb: 2,
        }}>
        <Tooltip title="Добавить...">
          <Fab color="primary" aria-label="add" sx={{zIndex: 0}}>
            <AddIcon onClick={handleOpenModalNewItem}/>
          </Fab>
        </Tooltip>
      </Typography>







      </Container>
    )
  };

/*

      { clients.map((client) => (
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
                <Fab size="small" aria-label="edit" sx={{backgroundColor: '#df87ee', zIndex: 0}}>
                  <EditIcon onClick={() => handleOpenEditBlock(client)}/>
                </Fab>
              </Tooltip>
              <Tooltip title="Удалить...">
                <Fab size="small" aria-label="delete" sx={{backgroundColor: '#ff9890', zIndex: 0}}>
                  <DeleteIcon onClick={
                    () => deleteClient(client.client_id)
                      .then( _ => { console.log('+++++++ Запрос deleteClient успешно завершен!')})
                      .catch(error => { console.error('------- ОШИБКА запроса deleteClient:', error)})
                
                  }/>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}

      <CardtypeModalNewItem {...optionsModalNewItem}/>

      { openEditBlock && 
        <>
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
                value={formData.first_name}
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
                name="last_name"
                label="Фамилия:"
                value={formData.last_name}
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
                name="phone_number"
                label="Телефон:"
                type="tel"
                value={formData.phone_number}
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
                name="email"
                label="Email:"
                type="email"
                value={formData.email}
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
                name="date_of_birth"
                type="datetime-local"
                label="Дата рождения:"
                value={(""+formData.date_of_birth).substring(0, 19)}
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
                value={(""+formData.registration_date).substring(0, 19)}
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
                  value={formData.status}
                  onChange={handleChange}
                  label="Статус:"
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Button
                 variant="contained" 
                 sx={{ mt: 2 }}
                 onClick={() => onChangeSubmit(formData)}
                >
                  Отправить
                </Button>
                <Button
                 variant="contained" 
                 sx={{ mt: 2 }}
                 onClick={onCancel}
                >
                  Отменить
                </Button>
                
              </Box>
            </Box>
          </Box>
         </>
      }
      </Container>
    )
  };
  
*/

/*

{
  "result": [
    {
      "card_type_id": "1",
      "card_type_name": "бюджетная",
      "price": 10000,
      "createdAt": "2024-10-16T13:32:02.000Z",
      "updatedAt": "2024-10-16T13:32:05.000Z"
    },
    {
      "card_type_id": "2",
      "card_type_name": "стандартная",
      "price": 30000,
      "createdAt": "2024-10-16T13:32:02.000Z",
      "updatedAt": "2024-10-16T13:32:05.000Z"
    },
    {
      "card_type_id": "3",
      "card_type_name": "премиум",
      "price": 50000,
      "createdAt": "2024-11-08T15:52:37.448Z",
      "updatedAt": "2024-11-08T15:52:43.155Z"
    }
  ],
  "error": ""
}

*/


  
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





  // <ClientModalEditItem {...{...optionsModalEditItem, client:{ first_name: client.first_name}}}/>
  // <ClientModalEditItem {...{...optionsModalEditItem, client: {...client}}}/>
  
  
  
  /*
  
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function FullWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1, border: '1px solid red' }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 8, md:5 }}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md:5 }}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md:2 }}>
          <Item>xs=6 md=4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
*/