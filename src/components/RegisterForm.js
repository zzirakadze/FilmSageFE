import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { registerUser } from '../api/authService';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateName,
  validateSurname,
} from '../utils/validators'; // Import validators

const RegisterForm = ({ navigation }) => {
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
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error when input changes
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
        <Text style={styles.title}>Register</Text>

        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
          />
        </View>
        {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Surname"
              value={formData.surname}
              onChangeText={(text) => handleInputChange('surname', text)}
          />
        </View>
        {!!errors.surname && (
            <Text style={styles.errorText}>{errors.surname}</Text>
        )}

        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
          />
        </View>
        {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Username"
              value={formData.username}
              onChangeText={(text) => handleInputChange('username', text)}
          />
        </View>
        {!!errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
        )}

        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
          />
        </View>
        {!!errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity
            style={styles.button}
            onPress={handleRegistration}
            disabled={loading}
        >
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
    backgroundColor: '#fff',
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
    width: 334, // Set the width to 334
    height: 81, // Set the height to 81
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#ff5252',
    paddingVertical: 15,
    width: 334, // Set the width to 334
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RegisterForm;
