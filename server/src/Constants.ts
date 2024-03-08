// Validation patterns
export const _emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const _passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const _usernamePattern = /^[a-zA-Z0-9_]+$/;

// Validation messages
export const emailValidationMessage = 'Invalid email';
export const passwordValidationMessage = 'Password must contain at least one number, symbol, uppercase and lowercase letter';
export const usernameValidationMessage = 'Username must contain only letters, numbers, and underscores';
export const postLengthValidationMessage ='Post length can\'t exceed 500 characters';
export const commentLengthValidationMessage = 'Comment length can\'t exceed 500 characters';
export const bioLengthValidationMessage = 'Bio length can\'t exceed 200 characters';
export const genderValidationMessage = 'Gender must be either male or female';
export const missingPostIValidationdMessage = 'No post id provided';
export const missingCommentIdValidationMessage = 'No comment id provided';
export const missingAuthorIdValidationMessage = 'No author id provided';
export const allFieldsRequiredValidationMessage = 'All fields are required';
export const accountExistsValidationMessage = 'Username or email already exists';
export const userTypeValidationMessage = 'Invalid user type'