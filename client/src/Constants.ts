const _emailValidationMessage = 'Invalid email';
const _passwordValidationMessage = 'Password must contain at least one number, symbol, uppercase and lowercase letter'
const _usernameValidationMessage = 'Username must contain only letters, numbers, and underscores'
const _emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const _passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const _usernamePattern = /^[a-zA-Z0-9_]+$/;

export const VALIDATION_PATTERNS = {
    email: {pattern: _emailPattern, message: _emailValidationMessage},
    password: {pattern: _passwordPattern, message: _passwordValidationMessage},
    username: {pattern: _usernamePattern, message: _usernameValidationMessage}
}
