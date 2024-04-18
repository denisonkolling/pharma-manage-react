import React, { useRef, useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function Cadastro() {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmarSenha, setConfirmarSenha] = useState('');
	const [convite, setConvite] = useState('');
	const [cadastroSucesso, setCadastroSucesso] = useState(false);

	const nomeRef = useRef(null);
	const emailRef = useRef(null);
	const senhaRef = useRef(null);
	const confirmarSenhaRef = useRef(null);
	const conviteRef = useRef(null);

	const handleCadastro = (e) => {
		e.preventDefault();

		console.log('Nome:', nome);
		console.log('Email:', email);
		console.log('Senha:', senha);
		console.log('Confirmação de Senha:', confirmarSenha);
		console.log('Convite:', convite);

		setCadastroSucesso(true);

		setNome('');
		setEmail('');
		setSenha('');
		setConfirmarSenha('');
		setConvite('');

		setTimeout(() => {
			setCadastroSucesso(false);
		}, 3000);
	};

	const isFormValid = () => {
		return (
			nome.length >= 5 &&
			nome.length <= 30 &&
			email.includes('@') &&
			email.includes('.') &&
			senha.length >= 6 &&
			senha === confirmarSenha &&
			convite.length >= 6 &&
			hasAlphabetic(convite) &&
			hasNumeric(convite)
		);
	};

	const hasAlphabetic = (str) => {
		const alphabeticRegex = /[a-zA-Z]/;
		return alphabeticRegex.test(str);
	};

	const hasNumeric = (str) => {
		const numericRegex = /[0-9]/;
		return numericRegex.test(str);
	};

	const handleInputChange = (setter, value) => {
		setter(value);
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
							zIndex: 1,
						}}>
						<IconButton sx={{ color: '#ffffff', width: '100%', height: '100%' }}>
							<AppRegistrationIcon />
						</IconButton>
					</Box>
					<Box
						sx={{
							padding: '20px',
							borderRadius: '5px',
							position: 'relative',
						}}>
						<Typography variant="h4" align="center" gutterBottom>
							Cadastro
						</Typography>
            <Typography variant="body1" align="center" gutterBottom>
						Preencha seus dados para registrar-se
					</Typography>
						{cadastroSucesso && (
							<Typography variant="h6" align="center" color="primary" gutterBottom>
								Cadastro realizado com sucesso!
							</Typography>
						)}
						<form onSubmit={handleCadastro} style={{width: '30rem'}}>
							<TextField
								label="Nome"
								variant="outlined"
								fullWidth
								margin="normal"
								inputRef={nomeRef}
								value={nome}
								error={nome.length > 0 && (nome.length < 5 || nome.length > 30)}
								helperText={nome.length > 0 && (nome.length < 5 || nome.length > 30) ? 'O nome deve ter entre 5 e 30 caracteres' : ''}
								onChange={(e) => handleInputChange(setNome, e.target.value)}
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
								label="Email"
								variant="outlined"
								fullWidth
								margin="normal"
								inputRef={emailRef}
								value={email}
								error={email.length > 0 && (!email.includes('@') || !email.includes('.'))}
								helperText={email.length > 0 && (!email.includes('@') || !email.includes('.')) ? 'Email inválido' : ''}
								onChange={(e) => handleInputChange(setEmail, e.target.value)}
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
								label="Senha"
								variant="outlined"
								type="password"
								fullWidth
								margin="normal"
								inputRef={senhaRef}
								value={senha}
								error={senha.length > 0 && senha.length < 6}
								helperText={senha.length > 0 && senha.length < 6 ? 'A senha deve ter no mínimo 6 caracteres' : ''}
								onChange={(e) => handleInputChange(setSenha, e.target.value)}
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
								label="Confirmar Senha"
								variant="outlined"
								type="password"
								fullWidth
								margin="normal"
								inputRef={confirmarSenhaRef}
								value={confirmarSenha}
								error={confirmarSenha.length > 0 && senha !== confirmarSenha}
								helperText={confirmarSenha.length > 0 && senha !== confirmarSenha ? 'As senhas não coincidem' : ''}
								onChange={(e) => handleInputChange(setConfirmarSenha, e.target.value)}
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
								label="Convite"
								variant="outlined"
								fullWidth
								margin="normal"
								inputRef={conviteRef}
								value={convite}
								error={convite.length > 0 && (convite.length < 6 || !hasAlphabetic(convite) || !hasNumeric(convite))}
								helperText={
									convite.length > 0 && (convite.length < 6 || !hasAlphabetic(convite) || !hasNumeric(convite))
										? 'O convite deve ter pelo menos 6 caracteres alfanuméricos'
										: ''
								}
								onChange={(e) => handleInputChange(setConvite, e.target.value)}
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
								fullWidth
								disabled={!isFormValid()}>
								Cadastrar
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
								Já possui uma conta? Clique aqui
							</Button>
						</form>
					</Box>
				</Card>
			</CardContent>
		</Card>
	);
}

export default Cadastro;
