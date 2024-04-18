import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, Link as MuiLink, CardContent, Card } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, error } = useContext(AuthContext);
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const handleLogin = (e) => {
		e.preventDefault();

		if (!isFormValid()) {
			return;
		}

		login(email, password);

		setEmail('');
		setPassword('');
	};

	const isFormValid = () => {
		const emailValid = isValidEmail(email);
		const passwordValid = password.length >= 6;
		return emailValid && passwordValid;
	};

	const isValidEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const updateEmailError = (value) => {
		setEmail(value);
		setEmailError(isValidEmail(value) ? '' : 'Email inválido');
	};

	const updatePasswordError = (value) => {
		setPassword(value);
		setPasswordError(value.length >= 6 ? '' : 'A senha deve ter no mínimo 6 caracteres');
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
							<LoginIcon />
						</IconButton>
					</Box>
					<Typography variant="h4" align="center" gutterBottom>
						Login
					</Typography>
					<Typography variant="body1" align="center" gutterBottom>
						Para acessar sua conta realize o login
					</Typography>
					{error && (
						<Typography variant="body1" align="center" color="error">
							{error}
						</Typography>
					)}
					<form onSubmit={handleLogin} style={{ width: '30rem' }}>
						<TextField
							label="Email"
							variant="outlined"
							fullWidth
							margin="normal"
							value={email}
							error={!!emailError}
							helperText={emailError}
							onChange={(e) => updateEmailError(e.target.value)}
							sx={{
								'& .MuiInputLabel-root.Mui-focused': {
									color: '#cab6fa',
								},
								'& .MuiOutlinedInput-root': {
									'&.Mui-focused fieldset': {
										borderColor: '#cab6fa',
									},
								},
							}}
						/>
						<TextField
							label="Password"
							variant="outlined"
							type="password"
							fullWidth
							margin="normal"
							value={password}
							error={!!passwordError}
							helperText={passwordError}
							onChange={(e) => updatePasswordError(e.target.value)}
							sx={{
								'& .MuiInputLabel-root.Mui-focused': {
									color: '#cab6fa',
								},
								'& .MuiOutlinedInput-root': {
									'&.Mui-focused fieldset': {
										borderColor: '#cab6fa',
									},
								},
							}}
						/>

						<Button variant="contained" fullWidth type="submit" disabled={!isFormValid()} sx={{ my: 2, width: '100%' }}>
							Login
						</Button>

						<Button variant="outlined" fullWidth type="submit" component={Link} to="/esqueci-senha" sx={{ width: '100%' }}>
							Esqueci minha senha
						</Button>

						<Typography variant="body1" align="center" sx={{ mt: 2, }}>
							Não tem uma conta?{' '}
							<MuiLink component={Link} to="/cadastro" sx={{ color: '#777575', textDecoration: 'none', fontWeight: 'bold' }}>
								Registre-se
							</MuiLink>
						</Typography>
					</form>
				</Card>
			</CardContent>
		</Card>
	);
}

export default Login;
