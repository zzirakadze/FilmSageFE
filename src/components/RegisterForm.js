// components/RegisterForm.js
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {registerUser} from '../api/authService';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateName,
  validateSurname,
} from '../utils/validators'; // Import validators

const RegisterForm = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
    setErrors({...errors, [name]: ''}); // Clear the error when input changes
  };

  const handleRegistration = async () => {
    const nameError = validateName(formData.name);
    const surnameError = validateSurname(formData.surname);
    const emailError = validateEmail(formData.email);
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);

    if (
      nameError ||
      surnameError ||
      emailError ||
      usernameError ||
      passwordError
    ) {
      setErrors({
        name: nameError,
        surname: surnameError,
        email: emailError,
        username: usernameError,
        password: passwordError,
      });
      return;
    }

    try {
      setLoading(true);
      const result = await registerUser(formData);
      setLoading(false);
      if (result.status_code === 201) {
        navigation.navigate('Login');
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={formData.surname}
        onChangeText={text => handleInputChange('surname', text)}
      />
      {!!errors.surname && (
        <Text style={styles.errorText}>{errors.surname}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
      />
      {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
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

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegistration}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
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
    color: 'rgba(15,45,2,0.93)',
  },
  errorText: {
    color: 'red',
    width: '100%',
    textAlign: 'left',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#1E6738',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RegisterForm;
