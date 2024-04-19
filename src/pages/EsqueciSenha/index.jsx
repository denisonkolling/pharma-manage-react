import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, CardContent, Card } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import CustomIconBox from '../../components/CustomIconBox';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
	email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
});

function RecuperarSenha() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [successMessage, setSuccessMessage] = useState('');

	const onSubmit = (data) => {
		console.log(data.email);
		setSuccessMessage('Um link para recuperação será enviado para o e-mail informado.');

		setTimeout(() => {
			setSuccessMessage('');
		}, 1500);
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
				<Card sx={{ padding: '20px', borderRadius: '5px', position: 'relative', boxShadow: '0 1px 200px rgba(0,0,0,0.15)' }}>
					<CustomIconBox>
						<PasswordIcon />
					</CustomIconBox>
					<Typography variant="h4" align="center" gutterBottom>
						Recuperação de Senha
					</Typography>
					{successMessage && <p style={{ color: '#4CAF50', textAlign: 'center',}}>{successMessage}</p>}

					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '30rem' }}>
						<TextField
							label="Email"
							variant="outlined"
							fullWidth
							margin="normal"
							{...register('email')}
							error={!!errors.email}
							helperText={errors.email ? errors.email.message : ''}
						/>
						<Button type="submit" variant="contained" fullWidth>
							Recuperar minha senha
						</Button>
						<Button component={Link} to="/login" variant="outlined" sx={{ mt: 1 }} fullWidth>
							Voltar para o Login
						</Button>
					</form>
				</Card>
			</CardContent>
		</Card>
	);
}

export default RecuperarSenha;
