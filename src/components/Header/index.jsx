import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';
import logo from '../../img/logo-image.png';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { IconButton } from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext';

const StyledButton = styled(Button)`
	&& {
		color: #fff;
		margin-right: 20px;
		background-color: transparent;
	}
`;

const Header = () => {
	const location = useLocation();
	const [usuarioMenuAnchor, setUsuarioMenuAnchor] = React.useState(null);
	const [empresaMenuAnchor, setEmpresaMenuAnchor] = React.useState(null);
	const [produtoMenuAnchor, setProdutoMenuAnchor] = React.useState(null);
	const { toggleTheme, theme } = useContext(ThemeContext);

	const handleUsuarioMenuOpen = (event) => {
		setUsuarioMenuAnchor(event.currentTarget);
	};

	const handleEmpresaMenuOpen = (event) => {
		setEmpresaMenuAnchor(event.currentTarget);
	};

	const handleProdutoMenuOpen = (event) => {
		setProdutoMenuAnchor(event.currentTarget);
	};

	const handleMenuClose = () => {
		setUsuarioMenuAnchor(null);
		setEmpresaMenuAnchor(null);
		setProdutoMenuAnchor(null);
	};

	return (
		<AppBar position="static" sx={{ minWidth: '550px' }}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
				<div>
					<div style={{ marginRight: '20px' }} />
					<Menu id="usuario-menu" anchorEl={usuarioMenuAnchor} open={Boolean(usuarioMenuAnchor)} onClose={handleMenuClose}>
						<MenuItem component={Link} to="/usuario/cadastro" onClick={handleMenuClose}>
							Cadastro
						</MenuItem>
						<MenuItem component={Link} to="/usuario/esqueci-minha-senha" onClick={handleMenuClose}>
							Esqueci minha senha
						</MenuItem>
					</Menu>

					<StyledButton
						aria-controls="empresa-menu"
						aria-haspopup="true"
						onClick={handleEmpresaMenuOpen}
						variant={location.pathname.startsWith('/empresa') ? 'contained' : 'text'}>
						Farmácia
					</StyledButton>
					<Menu id="empresa-menu" anchorEl={empresaMenuAnchor} open={Boolean(empresaMenuAnchor)} onClose={handleMenuClose}>
						<MenuItem component={Link} to="/empresa/cadastro" onClick={handleMenuClose}>
							Cadastro
						</MenuItem>
						<MenuItem component={Link} to="/empresa/listagem" onClick={handleMenuClose}>
							Listagem
						</MenuItem>
					</Menu>

					<StyledButton
						aria-controls="produto-menu"
						aria-haspopup="true"
						onClick={handleProdutoMenuOpen}
						variant={location.pathname.startsWith('/produto') ? 'contained' : 'text'}>
						Medicamento
					</StyledButton>
					<Menu id="produto-menu" anchorEl={produtoMenuAnchor} open={Boolean(produtoMenuAnchor)} onClose={handleMenuClose}>
						<MenuItem component={Link} to="/produto/cadastro" onClick={handleMenuClose}>
							Cadastro
						</MenuItem>
						<MenuItem component={Link} to="/produto/detalhamento" onClick={handleMenuClose}>
							Listagem
						</MenuItem>
						<MenuItem component={Link} to="/produto/transferencia" onClick={handleMenuClose}>
							Transferência
						</MenuItem>
						<MenuItem component={Link} to="/venda-medicamento" onClick={handleMenuClose}>
							Venda
						</MenuItem>
						<MenuItem component={Link} to="/aquisicao-medicamento" onClick={handleMenuClose}>
							Aquisição
						</MenuItem>
					</Menu>
				</div>
				<div>
					<IconButton onClick={toggleTheme} color="inherit">
						{theme === 'light' ? <Brightness4Icon /> : <DarkModeIcon />}
					</IconButton>

					<IconButton size="large" edge="end" color="inherit" component={Link} to="/">
						<LogoutIcon />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
