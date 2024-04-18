import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Pesquisar({ onPesquisa }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onPesquisa(value); 
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-search"
        label="Pesquisar Farmácia"
        type="search"
        variant="outlined"
        value={searchTerm} 
        onChange={handleSearchChange} 
        sx={{
          m: 2,
          width: '50%',
        }}
      />
    </Box>
  );
}