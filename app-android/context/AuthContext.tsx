import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { CONFIG } from '../constants/Config';

interface AuthContextType {
  userToken: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Comprobar si existe sesión persistida al iniciar
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token = null;
      try {
        token = await SecureStore.getItemAsync(CONFIG.SECURE_TOKEN_KEY);
      } catch (e) {
        console.error('Error al restaurar el token de SecureStore:', e);
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const login = async (token: string) => {
    try {
      await SecureStore.setItemAsync(CONFIG.SECURE_TOKEN_KEY, token);
      setUserToken(token);
    } catch (e) {
      console.error('Error al guardar el token de sesión:', e);
      throw e;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(CONFIG.SECURE_TOKEN_KEY);
      setUserToken(null);
    } catch (e) {
      console.error('Error al borrar el token de sesión:', e);
      throw e;
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
