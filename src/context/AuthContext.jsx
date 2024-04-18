import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const login = (email, password) => {
    // Lógica de autenticação
    if (email === 'admin@example.com' && password === 'password') {
      setAuthenticated(true);
      setError('');
    } else {
      setAuthenticated(false);
      setError('Usuário ou senha inválidos');
    }
  };

  const logout = () => {
    // Lógica de logout
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
