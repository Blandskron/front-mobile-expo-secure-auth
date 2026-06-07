import React from 'react';
import { ActivityIndicator, View, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';

const Stack = createStackNavigator();

function AppNavigation() {
    const { userToken, isLoading } = useAuth();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    if (isLoading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: isDark ? '#151718' : '#F5F5F5' }]}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: isDark ? '#1E2022' : '#FFFFFF',
                        borderBottomWidth: 1,
                        borderBottomColor: isDark ? '#2D3033' : '#E0E0E0',
                    },
                    headerTintColor: isDark ? '#ECEDEE' : '#11181C',
                    headerTitleStyle: {
                        fontWeight: '700',
                        fontSize: 18,
                    },
                    headerShadowVisible: false,
                }}
            >
                {userToken == null ? (
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppNavigation />
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
