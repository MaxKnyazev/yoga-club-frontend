import React from 'react';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useStoreOfYogaClub, getAllMembershiptypesSelector } from '../../store';
import { deleteEntity, editEntity } from '../../store';
import { MembershiptypeModalNewItem } from './MembershiptypeModalNewItem';
import { Error } from '../Error';

export const Membershiptypes = () => {
  const membershiptypes = useStoreOfYogaClub(getAllMembershiptypesSelector);

  const [currentMembershiptype, setCurrentMembershiptype] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');

  const [openModalNewItem, setOpenModalNewItem] = React.useState(false);
  const handleOpenModalNewItem = () => setOpenModalNewItem(true);
  const handleCloseModalNewItem = () => setOpenModalNewItem(false);
  
  const optionsModalNewItem = {
    openModalNewItem,
    handleCloseModalNewItem,
  }

  // console.log('*************************************************************');

  const [openModalEditItem, setOpenModalEditItem] = React.useState(false);
  const handleOpenModalEditItem = (membershiptype) => {
    setCurrentMembershiptype(membershiptype);
    setOpenModalEditItem(true);
  }
  const handleCloseModalEditItem = () => setOpenModalEditItem(false);

  const optionsModalEditItem = {
    openModalEditItem,
    handleCloseModalEditItem,
    currentMembershiptype,
  }

  // console.log('*************************************************************');

  const [formData, setFormData] = React.useState({});

  // console.log('formData');
  // console.log(formData);
  
  const [openEditBlock, setOpenEditBlock] = React.useState(false);
  const handleOpenEditBlock = (membershiptype) => {
    console.log('handleOpenEditBlock  --> ', membershiptype);
    setFormData({ ...formData, ...membershiptype, });
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
    const { type_id, updatedAt, createdAt, ...putData } = data;
    // console.log('client_id   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(client_id)
    // console.log('putData   >>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(putData)

    editEntity(type_id, 'type_id', 'membershiptypes', putData)
      .then( _ => { console.log('+++++++ Запрос editEntity -- Membershiptypes успешно завершен!')})
      .catch(error => { console.error('------- ОШИБКА запроса editEntity -- Membershiptypes:', error)});

    setFormData({
      type_name: '',
      sessions_allowed: '',
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
 
  return (
    <Container>
      <Typography variant="h5" 
        sx={{
          textAlign: 'center', 
          textTransform: 'uppercase',
          color: '#141414',
          mb: 2,
        }}>
        Типы членства клуба
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
      {errorMessage && <Error setErrorMessage={setErrorMessage} errorMessage={`${errorMessage}`}/>}
      { membershiptypes.map((membershiptype) => (
        <Box key={membershiptype.type_id}
         sx={{ 
          flexGrow: 1,
          paddingBottom: 1, 
        }}>
          <Grid 
            container spacing={0}
            sx={{display: 'flex', justifyContent: 'center'}}
            >
            <Grid
              display="flex"
              alignItems="center" 
              size={{ xs: 12, sm: 6, md: 4 }}
              sx={{borderBottom: '1px solid #1976d2'}}
            >
              <Typography variant="subtitle1"
                sx={{
                  color: '#141414',
                  fontSize: '1.2rem',
                  pl: 1,
                  fontWeight: 'bold',
                }}>
                {membershiptype.type_name}
              </Typography>
            </Grid>
            <Grid
             display="flex" 
             alignItems="center" 
             size={{ xs: 12, sm: 6, md: 4 }}
             sx={{borderBottom: '1px solid #1976d2'}}
            >
              <Typography variant="subtitle1" 
                sx={{
                  color: '#141414',
                  fontSize: '1rem',
                  pl: 1,
                }}>
                Кол.-во сеансов: {membershiptype.sessions_allowed}
              </Typography>
            </Grid>
            <Grid
             display="flex" 
             justifyContent="space-around" 
             alignItems="center" 
             size={{ xs: 12, sm: 4, md: 2 }}
            >
              <Tooltip title="Изменить...">
                <Fab 
                  size="small" 
                  aria-label="edit" 
                  sx={{backgroundColor: '#df87ee', zIndex: 0}}
                  onClick={() => handleOpenEditBlock(membershiptype)}
                >
                  <EditIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Удалить...">
                <Fab 
                  size="small" 
                  aria-label="delete" 
                  sx={{backgroundColor: '#ff9890', zIndex: 0}}
                  onClick={
                    () => deleteEntity(membershiptype.type_id, 'type_id', 'membershiptypes')
                      .then( _ => { console.log('+++++++ Запрос deleteEntity -- Membershiptypes успешно завершен!')})
                      .catch(error => { 
                        console.error('------- ОШИБКА запроса deleteEntity -- Membershiptypes:', error);
                        setErrorMessage(error)
                    })
                  }
                >
                  <DeleteIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}

      <MembershiptypeModalNewItem {...optionsModalNewItem}/>

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
                name="type_name"
                label="Тип:"
                value={formData.type_name}
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
                name="sessions_allowed"
                label="Кол.-во сеансов:"
                type="number"
                value={formData.sessions_allowed}
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
