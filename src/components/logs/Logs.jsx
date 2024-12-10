import React, { useEffect } from 'react';
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
// import { deleteClient, editClient} from '../../store';
// import { ClientModalNewItem } from './ClientModalNewItem';
// import { ClientModalInfo } from './ClientModalInfo';
import { useStoreOfYogaClub, getAllLogsSelector } from '../../store';
import { getEntityes } from '../../store';

export const Logs = () => {
  useEffect(() => {
    getEntityes('logs')
      .then( _ => { console.log('+++++++ Запрос /logs успешно завершен!')})
      .catch(error => { console.error('------- ОШИБКА запроса /logs:', error)});
  }, []);

  const logs = useStoreOfYogaClub(getAllLogsSelector);
  console.log('logs')
  console.log(logs)

  return (
    <Container>
      <Typography variant="h5" 
        sx={{
          textAlign: 'center', 
          textTransform: 'uppercase',
          color: '#141414',
          mb: 2,
        }}>
      Архив операций
      </Typography>
      { logs.map((log) => (
        <Box key={log.log_id}
          sx={{ 
           flexGrow: 1,
           paddingBottom: 1, 
          }}>
          <Grid container spacing={0} 
            sx={{border: '1px solid #1976d2', backgroundColor: "azure"}}
          >
            <Grid 
             display="flex"
             alignItems="center" 
             justifyContent="center"
             size={{ xs: 12, md: 4 }}
            >
              <Typography variant="subtitle1"
                sx={{
                  color: '#141414',
                  fontSize: '1rem',
                  pl: 1,
                }}>
                {log.log_id} Дата: {log.log_date}
              </Typography>
            </Grid>
            <Grid
             display="flex" 
             alignItems="center" 
             justifyContent="center"
             size={{ xs: 12, md: 4 }}
            >
              <Typography variant="subtitle1" 
                sx={{
                  color: '#141414',
                  fontSize: '1rem',
                  pl: 1,
                }}>
                Операция: {log.operation} Таблица: {log.table_name}
              </Typography>
            </Grid>
            <Grid
             display="flex" 
             alignItems="center" 
             justifyContent="center"
             size={{ xs: 12, md: 4 }}
            >
              <Typography variant="subtitle1" 
                sx={{
                  color: '#141414',
                  fontSize: '1rem',
                  pl: 1,
                }}>
                Триггер: {log.trigger_name} ID записи: {log.tables_id}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Container>
  );
};
