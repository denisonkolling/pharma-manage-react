import React, { useState, useContext } from 'react';
import { RoutesApp } from './routes';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes';
import { ThemeContext } from '../src/context/ThemeContext';

function App() {
	const { theme } = useContext(ThemeContext);

	return (
		<AuthProvider>
			<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
				<RoutesApp />
				<ToastContainer />
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
