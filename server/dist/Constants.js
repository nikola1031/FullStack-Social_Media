"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDeletionFailurMessage = exports.invalidFileFormatMessage = exports.multerErrors = exports.resourceOwnershipMessage = exports.userNotFoundMessage = exports.resourceNotFoundMessage = exports.postNotFoundMessage = exports.commentNotFoundMessage = exports.fetchCommentsMessage = exports.followUnsucessfulMessage = exports.cannotFollowSelfMessage = exports.alreadyFriendsMessage = exports.friendshipWithSelfMessage = exports.avatarUpdateFailedMessage = exports.uploadFailedMessage = exports.unauthorizedActionMessage = exports.loginRequiredMessage = exports.alreadyLoggedInMessage = exports.tokenExpiredMessage = exports.postDeleteMessage = exports.postUpdateMessage = exports.deleteCommentMessage = exports.saveCommentMessage = exports.postCommentMessage = exports.passwordsMustMatchMessage = exports.fileUploadNotFoundMessage = exports.textRequiredMessage = exports.userTypeValidationMessage = exports.accountExistsValidationMessage = exports.allFieldsRequiredValidationMessage = exports.missingAuthorIdValidationMessage = exports.missingCommentIdValidationMessage = exports.missingPostIValidationdMessage = exports.genderValidationMessage = exports.bioLengthValidationMessage = exports.commentLengthValidationMessage = exports.postLengthValidationMessage = exports.usernameValidationMessage = exports.passwordValidationMessage = exports.emailValidationMessage = exports.wrongEmailOrPasswordMessage = exports.userFollowSuccess = exports.passwordUpdateSuccessMessage = exports.postDeletionSuccessMessage = exports.commentDeletionSuccessMessage = exports._usernamePattern = exports._passwordPattern = exports._emailPattern = exports.jwtExpirationTime = void 0;
exports.jwtExpirationTime = '2h';
// Validation patterns
exports._emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
exports._passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
exports._usernamePattern = /^[a-zA-Z0-9_]+$/;
// Success messages
exports.commentDeletionSuccessMessage = 'Comment successfully deleted';
exports.postDeletionSuccessMessage = 'Post successfully deleted';
exports.passwordUpdateSuccessMessage = 'Password updated successfully';
exports.userFollowSuccess = 'User followed successfully';
// Input Validation errors
exports.wrongEmailOrPasswordMessage = 'Wrong email or password';
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
exports.textRequiredMessage = 'Text is required';
exports.fileUploadNotFoundMessage = 'Uploaded file not found';
exports.passwordsMustMatchMessage = 'Passwords must match';
// Action validation errors
exports.postCommentMessage = 'Could not post comment';
exports.saveCommentMessage = 'Could not save comment';
exports.deleteCommentMessage = 'Could not delete comment';
exports.postUpdateMessage = 'Could not update post';
exports.postDeleteMessage = 'Could not delete post';
exports.tokenExpiredMessage = 'Token expired or is invalid. Please log in';
exports.alreadyLoggedInMessage = 'You are already logged in. Please log out to switch accounts.';
exports.loginRequiredMessage = 'Login required';
exports.unauthorizedActionMessage = 'You are not authorized to perform this action';
exports.uploadFailedMessage = 'Failed to upload images';
exports.avatarUpdateFailedMessage = 'Profile picture update failed. Invalid user';
exports.friendshipWithSelfMessage = 'Cannot befriend self';
exports.alreadyFriendsMessage = 'You are already friends';
exports.cannotFollowSelfMessage = 'Cannot follow self';
exports.followUnsucessfulMessage = 'Follow unsuccessful';
// Data fetching erros
exports.fetchCommentsMessage = 'Could not fetch comments';
exports.commentNotFoundMessage = 'Comment not found';
exports.postNotFoundMessage = 'Post not found';
exports.resourceNotFoundMessage = 'Resource not found';
exports.userNotFoundMessage = 'User not found';
exports.resourceOwnershipMessage = 'Error checking resource ownership';
// File errors
exports.multerErrors = {
    LIMIT_PART_COUNT: 'Exceeded the maximum number of parts allowed in the request',
    LIMIT_FILE_SIZE: 'The file size exceeds the maximum allowed size',
    LIMIT_FILE_COUNT: 'Maximum of 5 files can be uploaded at once',
    LIMIT_FIELD_KEY: 'The field name is too long',
    LIMIT_FIELD_VALUE: 'The field value is too long',
    LIMIT_FIELD_COUNT: 'Exceeded the maximum number of fields allowed',
    LIMIT_UNEXPECTED_FILE: 'Maximum of 5 files can be uploaded at once',
    MISSING_FIELD_NAME: 'The field name is missing'
};
exports.invalidFileFormatMessage = 'Invalid file format';
exports.imageDeletionFailurMessage = 'Failed to delete image';
//# sourceMappingURL=Constants.js.map