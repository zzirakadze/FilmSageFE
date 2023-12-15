import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../api/authService';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
    });

    const handleRegistration = async () => {
        if (!formData.username || !formData.password || !formData.email || !formData.name || !formData.surname) {
            Alert.alert('Please fill in all fields');
            return;
        }
        const result = await registerUser(formData);
        if (result.message) {
            Alert.alert(result.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Text inputs for name, surname, email, username, and password */}
            <Button title="Register" onPress={handleRegistration} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
    },
});

export default RegisterForm;
