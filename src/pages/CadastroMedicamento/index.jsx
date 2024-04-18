import { TextField, MenuItem, Grid, Card, CardContent, Box, Button } from '@mui/material';
import { useState } from 'react';
import Header from '../../components/Header';
import { salvarMedicamento } from '../../services/api';
import { errorNotification, successNotification } from '../../services/notification';
import Typography from '@mui/material/Typography';
import CustomButton from '../../components/Button/CustomButton';

function CadastroMedicamento() {
	const [nroRegistro, setNroRegistro] = useState('');
	const [nroRegistroError, setNroRegistroError] = useState('');
	const [nome, setNome] = useState('');
	const [preco, setPreco] = useState('');
	const [precoError, setPrecoError] = useState('');
	const [formData, setFormData] = useState({
		nroRegistro: '',
		nome: '',
		laboratorio: '',
		dosagem: '',
		descricao: '',
		preco: '',
		tipo: '',
	});

	const handleNroRegistro = (e) => {
		const celularValue = e.target.value;
		setNroRegistro(celularValue);
		if (isNaN(celularValue)) {
			setNroRegistroError('O formato deve conter  números');
		} else {
			setNroRegistroError('');
		}
	};

	const handlePreco = (e) => {
		const precoValue = e.target.value;
		setPreco(precoValue);
		if (isNaN(precoValue)) {
			setPrecoError('O formato deve conter números');
		} else {
			setPrecoError('');
			setFormData((prevData) => ({
				...prevData,
				preco: precoValue,
			}));
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const dataToSend = {
			nroRegistro: parseInt(nroRegistro),
			nome: formData.nome,
			laboratorio: formData.laboratorio,
			dosagem: formData.dosagem,
			descricao: formData.descricao,
			preco: parseFloat(formData.preco),
			tipo: formData.tipo.toUpperCase(),
		};

		salvarMedicamento(dataToSend)
			.then((response) => {
				successNotification('Medicamento cadastrado com sucesso!');
				limparFormulario();
			})
			.catch((error) => {
				if (error.response && error.response.status === 400) {
					const errorMessage = `Erro ${error.response.data.titulo}: ${error.response.data.mensagem}`;
					errorNotification(errorMessage);
				} else {
					console.error('Erro ao cadastrar medicamento:', error);
				}
			});
	};

	const limparFormulario = () => {
		setFormData({
			nroRegistro: '',
			nome: '',
			laboratorio: '',
			dosagem: '',
			descricao: '',
			preco: '',
			tipo: '',
		});
		setPreco('');
		setNroRegistro('');
	};

	const handleTipoChange = (e) => {
		const { value } = e.target;
		setFormData((prevData) => ({ ...prevData, tipo: value }));
	};

	const tipoMedicamentos = [
		{ value: 'controlado', label: 'Controlado' },
		{ value: 'comum', label: 'Comum' },
	];

	return (
		<>
			<Grid container justifyContent="center" alignItems="center">
				<Header />

				<Card style={{ padding: '5px', margin: '5px', width: '100vw', height: '100vh' }}>
					<CardContent>
						<Typography variant="h5" gutterBottom align="center">
							Cadastro de Medicamento
						</Typography>

						<form onSubmit={handleSubmit}>
						<Grid container spacing={2} xs={12} sx={{ gap: 2, m: 2, p: 2 }} justifyContent="center" alignItems="center">
								<Grid item xs={12} sm={10} lg={5}>
									<TextField
										fullWidth
										margin="normal"
										onChange={handleNroRegistro}
										value={nroRegistro}
										error={nroRegistroError}
										helperText={nroRegistroError}
										required
										id="nroRegistro"
										key="nroRegistro"
										label="Numero de Registro"
										name="nroRegistro"
										color="secondary"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={10} lg={5}>
									<TextField
										fullWidth
										margin="normal"
										onChange={handleChange}
										value={formData.nome}
										required
										id="nome"
										key="nome"
										label="Nome do Medicamento"
										name="nome"
										color="secondary"
									/>
								</Grid>

								<Grid item xs={12} sm={10} lg={5}>
									<TextField
										fullWidth
										margin="normal"
										onChange={handleChange}
										value={formData.laboratorio}
										required
										id="laboratorio"
										key="laboratorio"
										label="Nome do Laboratório"
										name="laboratorio"
										color="secondary"
									/>
								</Grid>

								<Grid item xs={12} sm={10} lg={5}>
									<TextField
										fullWidth
										margin="normal"
										onChange={handleChange}
										value={formData.dosagem}
										required
										id="dosagem"
										key="dosagem"
										label="Dosagem"
										name="dosagem"
										color="secondary"
									/>
								</Grid>

								<Grid item xs={12} sm={10} lg={5}>
									<TextField
										fullWidth
										required
										margin="normal"
										onChange={handleChange}
										value={formData.descricao}
										id="descricao"
										key="descricao"
										multiline
										label="Descrição"
										name="descricao"
										color="secondary"
									/>
								</Grid>

								<Grid item xs={12} sm={10} lg={5}>
									<TextField
										fullWidth
										margin="normal"
										onChange={handlePreco}
										value={preco}
										error={Boolean(precoError)}
										helperText={precoError}
										key="preco"
										required
										id="preco"
										label="Preço"
										name="preco"
										color="secondary"
									/>
								</Grid>

								<Grid item xs={12} sm={10} lg={5}>
									<TextField
										fullWidth
										required
										id="tipo"
										select
										label="Tipo de medicamento"
										value={formData.tipo}
										key="tipo"
										onChange={handleTipoChange}
										color="secondary"
										sx={{
											minWidth: '20%',
											'& .MuiInputLabel-root.Mui-focused': {
												color: '#cab6fa',
											},
											'& .MuiOutlinedInput-root': {
												'&.Mui-focused fieldset': {
													borderColor: '#cab6fa',
												},
											},
										}}>
										{tipoMedicamentos.map((option) => (
											<MenuItem
												sx={{
													'&.Mui-selected': {
														color: '#cab6fa',
														backgroundColor: '#ffffff',
													},
													'&.Mui-selected:hover': {
														backgroundColor: '#cab6fa',
														color: '#ffffff',
													},
												}}
												key={option.value}
												value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>
									<Grid container justifyContent="center" item>
										<Button variant="contained" type="submit" sx={{ m: 2 }} onClick={handleSubmit}>
											Cadastrar Medicamento
										</Button>

										<Button variant="outlined" sx={{ m: 2 }} onClick={limparFormulario}>
											Cancelar
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</form>
					</CardContent>
				</Card>
			</Grid>
		</>
	);
}

export default CadastroMedicamento;
