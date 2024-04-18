import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const DetalhesMedicamentoModal = ({ open, onClose, medicamento }) => {
  const handleClose = () => {
    onClose();
  };

  const imageUrl = 'https://admin.cff.org.br/src/uploads/noticia/ea13ad05602c28a388f0c7f5e1dbe21d298684e1.jpeg';

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px'
        }}
      >
        <Typography variant="h5" component="h2" id="modal-title" gutterBottom>
          Detalhes do Medicamento
        </Typography>
        <Typography variant="body1" id="modal-description" gutterBottom>
          <strong>Registro:</strong> {medicamento.registro}<br />
          <strong>Nome:</strong> {medicamento.nome}<br />
          <strong>Laboratório:</strong> {medicamento.laboratorio}<br />
          <strong>Tipo:</strong> {medicamento.tipo}<br />
          <strong>Descrição:</strong> {medicamento.descricao}<br />
          <strong>Dosagem:</strong> {medicamento.dosagem}<br />
          <strong>Preço:</strong> R$ {medicamento.preco}<br />
        </Typography>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={medicamento.nome} 
            style={{ width: '100%', maxHeight: '200px', borderRadius: '5px', marginTop: '10px' }} 
          />
        )}
        <Button 
          variant="contained" 
          style={{ marginTop: '20px', backgroundColor: '#7E57C2', color: 'white' }}
          onClick={handleClose} 
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
}

export default DetalhesMedicamentoModal;
