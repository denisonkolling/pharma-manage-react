import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.shadows[3],
	transition: 'transform 0.3s ease-in-out',
	'&:hover': {
		transform: 'scale(1.02)',
	},
}));

const Title = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.main,
	marginBottom: theme.spacing(2),
}));

const MedicamentoCard = ({ registro, nome, laboratorio, preco, tipo, imagem }) => {
	return (
		<StyledCard variant="outlined">
			<CardMedia
				component="img"
				height="140"
				image={'https://acripel.com.br/blog/wp-content/uploads/2021/05/Medicamento-generico-saiba-mais-sobre-ele-1110x440.jpg'}
				alt={nome}
			/>
			<CardContent>
				<Title variant="h5" component="h2">
					{nome}
				</Title>
				<Typography gutterBottom>
					<strong>Registro:</strong> {registro}
				</Typography>
				<Typography gutterBottom>
					<strong>Laboratório:</strong> {laboratorio}
				</Typography>
				<Typography gutterBottom>
					<strong>Preço:</strong> {preco}
				</Typography>
				<Typography gutterBottom>
					<strong>Tipo:</strong> {tipo}
				</Typography>
			</CardContent>
		</StyledCard>
	);
};

export default MedicamentoCard;
