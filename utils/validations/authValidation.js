
/**
 * Validates login form data
 */
export const validateLogin = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be 8+ characters";
  }

  return errors;
};

/**
 * Validates registration form data
 */
export const validateRegister = (data) => {
  const newErrors = {};

  if (!data.userName) newErrors.userName = "Name is required";

  if (!data.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!data.password) {
    newErrors.password = "Password is required";
  } else if (data.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  return newErrors;
};