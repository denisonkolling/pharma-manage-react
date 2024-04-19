import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, IconButton, Link as MuiLink, CardContent, Card } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
});

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const { login, error } = useContext(AuthContext);

  const onSubmit = data => {
    login(data.email, data.password);
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
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '30rem' }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
            />

            <Button variant="contained" fullWidth type="submit" sx={{ my: 2}}>
              Login
            </Button>

            <Button variant="outlined" fullWidth type="submit" component={Link} to="/esqueci-senha">
              Esqueci minha senha
            </Button>

            <Typography variant="body1" align="center" sx={{ mt: 2, }}>
              Não tem uma conta?{' '}
              <MuiLink component={Link} to="/cadastro" sx={{ textDecoration: 'none', fontWeight: 'bold' }}>
                Cadastre-se
              </MuiLink>
            </Typography>
          </form>
        </Card>
      </CardContent>
    </Card>
  );
}

export default Login;
