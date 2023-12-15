import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../api/authService';

function RegisterForm  ({navigation})  {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState(false)

    const handleRegistration = async () => {
        if (!formData.username || !formData.password || !formData.email || !formData.name || !formData.surname) {
            Alert.alert('Please fill in all fields');
        }
        try {
            setLoading(true)
            const result = await registerUser(formData);
            console.log(result)
            if(result.status_code === 201){

                 navigation.navigate("Login")
            }
            setLoading(false)
        }catch (e){
            console.log("error", e)
        }finally {
            setLoading(false)
        }
    };

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <View style={styles.container}>
            {/* Text inputs for name, surname, email, username, and password */}
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Surname"
                    value={formData.surname}
                    onChangeText={(text) => handleInputChange('surname', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />
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
                <Button disabled={loading} title="Submit" onPress={handleRegistration} />
            </View>
            {/*<Button title="Register" onPress={handleRegistration} />*/}
        </View>
    );
}

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
