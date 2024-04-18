import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #a46af3',
  boxShadow: 24,
  width: '70vw',
  height: '70vh',
  p: 4,
};

const handleClose = () => {
  window.location.reload();
};


const MapModal = ({ open, latitude, longitude }) => {

  if (!latitude || !longitude || latitude === 0 || longitude === 0) {
    latitude = -27.5961;
    longitude = -48.5651;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
       
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 1,
            right: 0,
            color: '#a46af3',
          }}
        >
          <CloseIcon />
        </IconButton>
        <MapContainer center={[latitude, longitude]} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
            </Popup>
          </Marker>
         
        </MapContainer>
      </Box>
    </Modal>
  );
};

export default MapModal;