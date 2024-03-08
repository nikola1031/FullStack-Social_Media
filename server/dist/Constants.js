"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeValidationMessage = exports.accountExistsValidationMessage = exports.allFieldsRequiredValidationMessage = exports.missingAuthorIdValidationMessage = exports.missingCommentIdValidationMessage = exports.missingPostIValidationdMessage = exports.genderValidationMessage = exports.bioLengthValidationMessage = exports.commentLengthValidationMessage = exports.postLengthValidationMessage = exports.usernameValidationMessage = exports.passwordValidationMessage = exports.emailValidationMessage = exports._usernamePattern = exports._passwordPattern = exports._emailPattern = void 0;
// Validation patterns
exports._emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
exports._passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
exports._usernamePattern = /^[a-zA-Z0-9_]+$/;
// Validation messages
exports.emailValidationMessage = 'Invalid email';
exports.passwordValidationMessage = 'Password must contain at least one number, symbol, uppercase and lowercase letter';
exports.usernameValidationMessage = 'Username must contain only letters, numbers, and underscores';
exports.postLengthValidationMessage = 'Post length can\'t exceed 500 characters';
exports.commentLengthValidationMessage = 'Comment length can\'t exceed 500 characters';
exports.bioLengthValidationMessage = 'Bio length can\'t exceed 200 characters';
exports.genderValidationMessage = 'Gender must be either male or female';
exports.missingPostIValidationdMessage = 'No post id provided';
exports.missingCommentIdValidationMessage = 'No comment id provided';
exports.missingAuthorIdValidationMessage = 'No author id provided';
exports.allFieldsRequiredValidationMessage = 'All fields are required';
exports.accountExistsValidationMessage = 'Username or email already exists';
exports.userTypeValidationMessage = 'Invalid user type';
//# sourceMappingURL=Constants.js.map