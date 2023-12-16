export const validateEmail = email => {
  // Simple regex for email validation
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Invalid email address';
  }
  return '';
};

export const validatePassword = password => {
  // Assuming a password requires at least one number, one uppercase, one lowercase, and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
  if (!password) {
    return 'Password is required';
  }
  if (!passwordRegex.test(password)) {
    return 'Password does not meet complexity requirements';
  }
  return '';
};

export const validateUsername = username => {
  if (!username) {
    return 'Username is required';
  }
  // Add more rules if needed
  return '';
};

export const validateName = name => {
  if (!name) {
    return 'Name is required';
  }
  // Add more rules if needed
  return '';
};

export const validateSurname = surname => {
  if (!surname) {
    return 'Surname is required';
  }
  // Add more rules if needed
  return '';
};
