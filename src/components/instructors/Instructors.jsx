import React from 'react';
import { Container, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useStoreOfYogaClub, getAllInstructorsSelector } from '../../store';
import { deleteEntity, editEntity} from '../../store';
import { InstructorModalNewItem } from './InstructorModalNewItem';
import { InstructorModalInfo } from './InstructorModalInfo';


  


export const Instructors = () => {
  const instructors = useStoreOfYogaClub(getAllInstructorsSelector);

  const [currentInstructor, setCurrentInstructor] = React.useState({});

  const [openModalNewItem, setOpenModalNewItem] = React.useState(false);
  const handleOpenModalNewItem = () => setOpenModalNewItem(true);
  const handleCloseModalNewItem = () => setOpenModalNewItem(false);
    const optionsModalNewItem = {
    openModalNewItem,
    handleCloseModalNewItem,
  }

  const [openModalInfo, setOpenModalInfo] = React.useState(false);
  const handleOpenModalInfo = (instructor) => {
    setCurrentInstructor(instructor);
    setOpenModalInfo(true);
  }
  const handleCloseModalInfo = () => setOpenModalInfo(false);
  const optionsModalInfo = {
    openModalInfo,
    handleCloseModalInfo,
    currentInstructor,
  }

  const [openModalEditItem, setOpenModalEditItem] = React.useState(false);
  const handleOpenModalEditItem = (instructor) => {
    setCurrentInstructor(instructor);//?????????????????????????????????????????
    setOpenModalEditItem(true);
  }
  const handleCloseModalEditItem = () => setOpenModalEditItem(false);
  const optionsModalEditItem = {
    openModalEditItem,
    handleCloseModalEditItem,
    currentInstructor,
  }

  // console.log('*************************************************************');

  const [formData, setFormData] = React.useState({});

  console.log('formData');
  console.log(formData);
  
  const [openEditBlock, setOpenEditBlock] = React.useState(false);
  const handleOpenEditBlock = (instructor) => {
    console.log('handleOpenEditBlock  --> ', instructor);
    setFormData({ ...formData, ...instructor, });
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

    // console.log('data   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(data)
    const { instructor_id, updatedAt, createdAt, ...putData } = data;
    // console.log('instructor_id   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(instructor_id)
    // console.log('putData   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(putData)


    editEntity(instructor_id, 'instructor_id', 'instructors', putData)
      .then( _ => { console.log('+++++++ Запрос editEntity -- Cardtypes успешно завершен!')})
      .catch(error => { console.error('------- ОШИБКА запроса editEntity -- Cardtypes:', error)});


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

    setFormData({
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      specialization: '',
      experience_years: 0,
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
        Инструкторы клуба
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
      { instructors.map((instructor) => (
        <Box key={instructor.instructor_id}
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
                {instructor.first_name} {instructor.last_name}
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
                Специализация: {instructor.specialization} Опыт работы: {instructor.experience_years}
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
                  <EditIcon onClick={() => handleOpenEditBlock(instructor)}/>
                </Fab>
              </Tooltip>
              <Tooltip title="Удалить...">
                <Fab size="small" aria-label="delete" sx={{backgroundColor: '#ff9890', zIndex: 0}}>
                  <DeleteIcon onClick={
                    () => deleteEntity(instructor.instructor_id, 'instructor_id', 'instructors')
                      .then( _ => { console.log('+++++++ Запрос deleteEntity -- Instructors успешно завершен!')})
                      .catch(error => { console.error('------- ОШИБКА запроса deleteEntity -- Instructors:', error)})
                  }/>
                </Fab>
              </Tooltip>
              <Tooltip title="Подробнее...">
                <Fab size="small" aria-label="send" sx={{backgroundColor: '#ffeb3b', zIndex: 0}}>
                  <SendIcon onClick={() => handleOpenModalInfo(instructor)}/>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}

      <InstructorModalInfo {...optionsModalInfo}/>
      <InstructorModalNewItem {...optionsModalNewItem}/>

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
                name="specialization"
                label="Специализация:"
                value={formData.specialization}
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
                value={formData.experience_years}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
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


  /*


      { instructors.map((instructor) => (
        <Box key={instructor.instructor_id}
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
                {instructor.first_name} {instructor.last_name}
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
                Тел.: {instructor.phone_number} Email: {instructor.email}
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
                  <EditIcon onClick={() => handleOpenEditBlock(instructor)}/>
                </Fab>
              </Tooltip>
              <Tooltip title="Удалить...">
                <Fab size="small" aria-label="delete" sx={{backgroundColor: '#ff9890', zIndex: 0}}>
                  <DeleteIcon onClick={
                    () => deleteinstructor(instructor.instructor_id)
                      .then( _ => { console.log('+++++++ Запрос deleteinstructor успешно завершен!')})
                      .catch(error => { console.error('------- ОШИБКА запроса deleteinstructor:', error)})
                
                  }/>
                </Fab>
              </Tooltip>
              <Tooltip title="Подробнее...">
                <Fab size="small" aria-label="send" sx={{backgroundColor: '#ffeb3b', zIndex: 0}}>
                  <SendIcon onClick={() => handleOpenModalInfo(instructor)}/>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}

      <instructorModalNewItem {...optionsModalNewItem}/>
      <instructorModalInfo {...optionsModalInfo}/>




  */