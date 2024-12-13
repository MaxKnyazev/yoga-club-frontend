import React from 'react';
import { Container, Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

export const Error = ({setErrorMessage, errorMessage}) => {
    return (
      <Container sx={{
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f59191',
        marginBottom: '2rem',
        border: '2px solid red',
        borderRadius: '15px'
        }}>
        <Typography variant="h4" gutterBottom>
          Удаление невозможно!
        </Typography>
        <Typography variant="h4" gutterBottom>
          Нарушение целостности таблиц БД!
        </Typography>
        <Typography variant="body1" gutterBottom>
          {errorMessage}
        </Typography>
        <Typography variant="h5" 
          sx={{
            textAlign: 'center', 
            mb: 2,
          }}>
          <Tooltip title="Закрыть...">
            <Fab 
              color="secondary" 
              aria-label="add" 
              sx={{zIndex: 0}}
              onClick={() => {
                setErrorMessage('')
              }}
            >
              <CloseIcon />
            </Fab>
          </Tooltip>
        </Typography>
      </Container>
    );
  }
  
  