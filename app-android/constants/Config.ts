import { Platform } from 'react-native';

// En el emulador de Android, 127.0.0.1 hace referencia al propio emulador.
// Para conectarse al localhost de la máquina host, debemos usar 10.0.2.2.
const LOCALHOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

const DEFAULT_API_URL = `http://${LOCALHOST}:8000/api`;

export const CONFIG = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL,
  SECURE_TOKEN_KEY: 'user_session_token',
};
