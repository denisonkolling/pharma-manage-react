import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Card, CardContent } from '@mui/material';
import { aquisicaoMedicamento } from '../../services/api';
import Header from '../../components/Header';
import CustomButton from '../../components/Button/CustomButton';
import { successNotification, errorNotification } from '../../services/notification';

function AquisicaoMedicamento() {
	const [formData, setFormData] = useState({
		nroRegistro: '',
		quantidade: '',
		cnpj: '',
	});

	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		aquisicaoMedicamento(formData)
			.then((response) => {
				successNotification('Aquisição realizada com sucesso!');
				limparFormulario();
			})
			.catch((error) => {
				setError(error);
				errorNotification('Erro ' + error.response.data.titulo + ' ' + error.response.data.mensagem);
			});
	};

	const limparFormulario = () => {
		setFormData({
			nroRegistro: '',
			quantidade: '',
			cnpj: '',
		});
	};

	return (
		<Grid container justifyContent="center" alignItems="center">
			<Header />
			<Card style={{ padding: '5px', margin: '5px', width: '100vw', height: '100vh' }}>
				<CardContent align="center">
					<Typography variant="h5" gutterBottom>
						Aquisição de Medicamento
					</Typography>

					<form onSubmit={handleSubmit} style={{ width: '30rem' }}>
						<TextField
							label="Registro do Medicamento"
							variant="outlined"
							name="nroRegistro"
							value={formData.nroRegistro}
							onChange={handleChange}
							fullWidth
							margin="normal"
							color="secondary"
						/>

						<TextField
							label="Quantidade"
							variant="outlined"
							name="quantidade"
							value={formData.quantidade}
							onChange={handleChange}
							fullWidth
							margin="normal"
							color="secondary"
						/>

						<TextField label="CNPJ" variant="outlined" name="cnpj" value={formData.cnpj} onChange={handleChange} fullWidth margin="normal" color="secondary" />

						<Button variant="contained" onClick={handleSubmit}>
							Adquirir Medicamento
						</Button>
						<Button variant="outlined" onClick={limparFormulario} sx={{ m: 2 }}>
							Cancelar
						</Button>
					</form>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default AquisicaoMedicamento;
