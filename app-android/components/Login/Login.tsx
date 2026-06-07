import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    useColorScheme,
    StatusBar,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { CustomInput } from '../ui/CustomInput';
import { CustomButton } from '../ui/CustomButton';
import { CONFIG } from '../../constants/Config';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const { login } = useAuth();
    
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Animaciones
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const validate = () => {
        const newErrors: { username?: string; password?: string } = {};
        if (!username.trim()) {
            newErrors.username = 'El nombre de usuario es obligatorio.';
        }
        if (!password) {
            newErrors.password = 'La contraseña es obligatoria.';
        } else if (password.length < 4) {
            newErrors.password = 'La contraseña debe tener al menos 4 caracteres.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${CONFIG.API_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username.trim(), password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login exitoso, token:', data.token);
                
                // Guardar token y actualizar estado reactivo en AuthContext
                await login(data.token);
            } else {
                let errorMessage = 'Credenciales incorrectas';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch {
                    // Fallback si no es JSON
                }
                Alert.alert('Error de Inicio de Sesión', errorMessage);
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            Alert.alert(
                'Error de Conexión', 
                'No pudimos conectarnos con el servidor. Por favor verifica tu conexión e intenta de nuevo.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Estilos basados en tema activo
    const backgroundColor = isDark ? '#151718' : '#F5F7FA';
    const cardColor = isDark ? '#1E2022' : '#FFFFFF';
    const titleColor = isDark ? '#FFFFFF' : '#11181C';
    const subtitleColor = isDark ? '#A1A1A5' : '#666666';

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor }]}
        >
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], width: '100%' }}>
                    <View style={styles.headerContainer}>
                        <View style={[styles.logoBadge, { backgroundColor: isDark ? '#2D3033' : '#E6F0FF' }]}>
                            <Ionicons name="shield-checkmark-sharp" size={42} color="#007BFF" />
                        </View>
                        <Text style={[styles.title, { color: titleColor }]}>¡Bienvenido!</Text>
                        <Text style={[styles.subtitle, { color: subtitleColor }]}>
                            Ingresa a tu cuenta para continuar
                        </Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: cardColor }]}>
                        <CustomInput
                            label="Usuario o Correo"
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChangeText={(text) => {
                                setUsername(text);
                                if (errors.username) setErrors(prev => ({ ...prev, username: undefined }));
                            }}
                            iconName="person-outline"
                            autoCapitalize="none"
                            autoCorrect={false}
                            error={errors.username}
                            editable={!isLoading}
                        />

                        <CustomInput
                            label="Contraseña"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                            }}
                            iconName="lock-closed-outline"
                            secureTextEntry
                            error={errors.password}
                            editable={!isLoading}
                        />

                        <CustomButton
                            title="Iniciar Sesión"
                            onPress={handleLogin}
                            loading={isLoading}
                            style={styles.buttonSpacing}
                        />
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={[styles.footerText, { color: isDark ? '#687076' : '#999999' }]}>
                            Desarrollado por Ilis Tecnología
                        </Text>
                    </View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoBadge: {
        width: 80,
        height: 80,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    card: {
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
    },
    buttonSpacing: {
        marginTop: 10,
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.3,
    },
});

export default Login;
