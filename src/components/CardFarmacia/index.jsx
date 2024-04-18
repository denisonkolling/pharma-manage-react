import * as React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import MapModal from '../MapModal';
import CustomButton from '../Button/CustomButton';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #a46af3',
	boxShadow: 24,
	p: 4,
};


const Header = styled.div`
	padding: 8px;
	background-color: #9370db;
	color: white;
`;

const Content = styled.div`
	padding: 20px;
	flex-grow: 1;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
`;

function CardStyled(props) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleEstoqueClick = () => {
		window.location.href = `/empresa/${props.cnpj}/estoque`;
	};

	return (
		<Card sx={{ m:2, width: '25%', minWidth: '25rem', boxShadow: '0 1px 200px rgba(0,0,0,0.15)', }}>
			<Header>
				<Typography variant="h5">{props.nomeFantasia}</Typography>
			</Header>
			<Content>
				<Typography>
					<b>CNPJ:</b> {props.cnpj}
				</Typography>
				<Typography>
					<b>Razão Social:</b> {props.razao_social}
				</Typography>
				<Typography>
					<b>Cidade:</b> {props.cidade}
				</Typography>
			</Content>
			<ButtonContainer>
				<Button variant="contained" sx={{ m: 2, }} onClick={handleEstoqueClick}>
					Consultar Estoque
				</Button>
				<Button variant="contained" sx={{ m: 2, width: '40%' }} onClick={handleOpen}>
					Ver Mapa
				</Button>
			</ButtonContainer>

			<MapModal
				latitude={props.latitude}
				longitude={props.longitude}
				open={open}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						{' '}
						Mapa
					</Typography>
				</Box>
			</MapModal>
		</Card>
	);
}

export { CardStyled };
