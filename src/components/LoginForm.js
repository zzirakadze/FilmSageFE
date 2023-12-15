import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../api/authService';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Add frontend validation if needed
        const result = await loginUser({ username, password });
        if (result.message) {
            Alert.alert(result.message);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Login" onPress={handleLogin} />
            <Button
                title="Go to Register"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // Style definitions (similar to RegisterForm)
});

export default LoginForm;
