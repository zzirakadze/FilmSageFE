import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {loginUser} from '../api/authService';
import {validatePassword, validateUsername} from '../utils/validators';

const LoginForm = ({navigation}) => {
  const [formData, setFormData] = useState({username: '', password: ''});
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
    setErrors({...errors, [name]: ''}); // Clear the error when input changes
  };

  const handleLogin = async () => {
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    if (usernameError || passwordError) {
      setErrors({username: usernameError, password: passwordError});
      return;
    }
    try {
      const result = await loginUser(formData);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={text => handleInputChange('username', text)}
      />
      {!!errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={formData.password}
        onChangeText={text => handleInputChange('password', text)}
      />
      {!!errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
    padding: 20,
    backgroundColor: 'rgba(7,155,120,0.32)',
  },
  input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
    borderColor: 'rgba(21,19,19,0.06)',
    backgroundColor: 'rgba(7,155,120,0.09)',
  },
  registerText: {
    marginTop: 20,
    color: 'rgba(4,49,8,0.93)',
  },
  errorText: {
    color: 'red',
    width: '100%',
    textAlign: 'left',
    marginBottom: 5,
  },
});

export default LoginForm;
