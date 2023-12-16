import React from 'react';
import {View, StyleSheet} from 'react-native';
import RegisterForm from '../components/RegisterForm';

const RegisterScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <RegisterForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default RegisterScreen;
