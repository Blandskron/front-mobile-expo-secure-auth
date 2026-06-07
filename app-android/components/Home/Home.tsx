import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, useColorScheme, SafeAreaView, StatusBar, Animated } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { CustomButton } from '../ui/CustomButton';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { logout } = useAuth();

    // Animaciones
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

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
                tension: 45,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            // Eliminar token y actualizar el estado de AuthContext de manera reactiva
            await logout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Estilos basados en tema
    const backgroundColor = isDark ? '#151718' : '#F5F7FA';
    const cardColor = isDark ? '#1E2022' : '#FFFFFF';
    const titleColor = isDark ? '#FFFFFF' : '#11181C';
    const subtitleColor = isDark ? '#A1A1A5' : '#666666';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            
            <View style={styles.content}>
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], flex: 1, justifyContent: 'space-between' }}>
                    {/* Cabecera / Bienvenida */}
                    <View style={styles.header}>
                        <Text style={[styles.welcomeText, { color: subtitleColor }]}>Bienvenido de vuelta,</Text>
                        <Text style={[styles.title, { color: titleColor }]}>Administrador</Text>
                    </View>

                    {/* Tarjeta de Información / Dashboard Status */}
                    <View style={[styles.card, { backgroundColor: cardColor }]}>
                        <View style={styles.profileHeader}>
                            <View style={styles.avatar}>
                                <Ionicons name="person-circle-sharp" size={64} color="#007BFF" />
                            </View>
                            <View style={styles.profileDetails}>
                                <Text style={[styles.profileName, { color: titleColor }]}>Usuario de Pruebas</Text>
                                <Text style={[styles.profileRole, { color: subtitleColor }]}>Super Administrador</Text>
                            </View>
                        </View>
                        
                        <View style={[styles.divider, { backgroundColor: isDark ? '#2D3033' : '#F0F0F0' }]} />
                        
                        <View style={styles.statusContainer}>
                            <View style={styles.statusItem}>
                                <Ionicons name="pulse" size={24} color="#34C759" />
                                <Text style={[styles.statusText, { color: titleColor }]}>Estado: Activo</Text>
                            </View>
                            <View style={styles.statusItem}>
                                <Ionicons name="time-outline" size={24} color="#FF9500" />
                                <Text style={[styles.statusText, { color: titleColor }]}>Sesión: Local</Text>
                            </View>
                        </View>
                    </View>

                    {/* Sección de acciones */}
                    <View style={styles.actionsContainer}>
                        <CustomButton
                            title="Cerrar Sesión"
                            onPress={handleLogout}
                            loading={isLoggingOut}
                            variant="danger"
                        />
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 20,
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: '500',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginTop: 4,
    },
    card: {
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 4,
        marginVertical: 40,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 16,
    },
    profileDetails: {
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '700',
    },
    profileRole: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 2,
    },
    divider: {
        height: 1,
        marginVertical: 20,
    },
    statusContainer: {
        gap: 12,
    },
    statusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
    },
    actionsContainer: {
        marginBottom: 20,
    },
});

export default Home;
