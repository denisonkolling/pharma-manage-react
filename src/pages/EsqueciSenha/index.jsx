import React, { useState, useRef } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, CardContent, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import PasswordIcon from '@mui/icons-material/Password';

function EsqueciSenha() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const emailRef = useRef(null);

	const handlePasswordRecovery = (e) => {
		e.preventDefault();

		const isValidEmail = validateEmail(email);
		if (!isValidEmail) {
			setError('E-mail inválido');
			return;
		}

		setSuccessMessage('Um link para recuperação será enviado para o e-mail informado.');

		setTimeout(() => {
			setSuccessMessage('');
		}, 3000);

		setEmail('');
		setError('');
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleInputChange = (setter, value) => {
		setter(value);
		if (value.trim() === '') {
			setError('');
		} else {
			setError(validateEmail(value) ? '' : 'E-mail inválido');
		}
	};

	return (
		<Card
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}>
			<CardContent>
				<Card maxWidth="sm" sx={{ padding: '20px', borderRadius: '5px', position: 'relative', boxShadow: '0 1px 200px rgba(0,0,0,0.15)' }}>
					<Box
						sx={{
							position: 'absolute',
							top: '10px',
							left: '10px',
							backgroundColor: '#cab6fa',
							width: '50px',
							height: '50px',
							borderRadius: '5px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							zIndex: 1,
						}}>
						<IconButton sx={{ color: '#ffffff' }}>
							<PasswordIcon />
						</IconButton>
					</Box>
					<Typography variant="h4" align="center" gutterBottom>
						Recuperação de Senha
					</Typography>

					{successMessage && <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>}
					<form onSubmit={handlePasswordRecovery} style={{ width: '30rem' }}>
						<TextField
							label="Email"
							variant="outlined"
							fullWidth
							margin="normal"
							inputRef={emailRef}
							error={!!error}
							helperText={error}
							value={email}
							onChange={(e) => handleInputChange(setEmail, e.target.value)}
							sx={{
								'& .MuiInputLabel-root.Mui-focused': {
									color: error ? 'red' : '#cab6fa',
								},
								'& .MuiOutlinedInput-root': {
									'&.Mui-focused fieldset': {
										borderColor: error ? 'red' : '#cab6fa',
									},
								},
							}}
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{
								backgroundColor: '#cab6fa',
								color: '#ffffff',
								'&:hover': {
									backgroundColor: '#ab9be3',
								},
								'&:focus': {
									backgroundColor: '#cab6fa',
									boxShadow: '0 0 0 0.2rem rgba(78,115,223,.5)',
								},
								marginTop: '10px',
							}}
							fullWidth>
							Recuperar minha senha
						</Button>
						<Button
							component={Link}
							to="/"
							variant="outlined"
							sx={{
								color: '#cab6fa',
								borderColor: '#cab6fa',
								'&:hover': {
									backgroundColor: 'transparent',
									borderColor: '#9370DB',
								},
								'&:focus': {
									borderColor: '#9370DB',
									boxShadow: '0 0 0 0.2rem rgba(78,115,223,.5)',
								},
								marginTop: '10px',
							}}
							fullWidth>
							Voltar para o Login
						</Button>
					</form>
				</Card>
			</CardContent>
		</Card>
	);
}

export default EsqueciSenha;
