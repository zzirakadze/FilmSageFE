import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { loginUser } from '../api/authService';

function LoginForm  ({navigation}) {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        // // Add frontend validation if needed
        try{
            const result = await loginUser(formData);
            // if (result.message) {
            //     Alert.alert(result.message);
            // }
            console.log(result)
        }catch (e) {
            console.log(e)
        }

    };

    const navigateToRegister = () => {
        // Navigate to the Register screen
        navigation.navigate('Register');
    };

    return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={formData.username}
            onChangeText={(text) => handleInputChange('username', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
        />
        <Button title="Login" onPress={handleLogin} />

        <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.registerText}>Don't have an account? Register</Text>
        </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
    registerText: {
        marginTop: 20,
        color: 'blue',
    },
});

export default LoginForm;
