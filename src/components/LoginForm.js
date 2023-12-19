import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loginUser } from '../api/authService';
import { validatePassword, validateUsername } from '../utils/validators';
import { getToken, storeToken } from "../utils/storage";

const LoginForm = ({ navigation }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error when input changes
  };

  const handleLogin = async () => {
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      return;
    }
    try {
      const result = await loginUser(formData);
      if (result?.access_token) {
        await storeToken(result.access_token);
        let storedToken = await getToken();
        if (storedToken) {
          navigation.navigate('MainApp');
        }
      } else {
        console.log('Access token not found in response:', result);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
      <View style={styles.container}>
        <LinearGradient
            colors={['#FF6E7F', '#Bfe9ff']}
            style={styles.card}
        >
          <Text style={styles.title}>Sign In</Text>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="add-circle-outline" size={20} color="#000" />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={formData.username}
                onChangeText={text => handleInputChange('username', text)}
            />
          </View>
          {errors.username && (
              <Text>
                <Text style={styles.errorText}>{errors.username}</Text>
              </Text>
          )}

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#000" />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={formData.password}
                onChangeText={text => handleInputChange('password', text)}
            />
          </View>
          {errors.password && (
              <Text>
                <Text style={styles.errorText}>{errors.password}</Text>
              </Text>
          )}

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text>
              <Text style={styles.registerText}>Don't have an account? Register</Text>
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: '80%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 15,
    width: '100%',
  },
  input: {
    flex: 2,
    paddingVertical: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff5252', // Use your primary color
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerText: {
    marginTop: 20,
    color: '#000',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default LoginForm;
