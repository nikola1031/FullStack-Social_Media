export const jwtExpirationTime = '2h';

// Validation patterns
export const _emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const _passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const _usernamePattern = /^[a-zA-Z0-9_]+$/;

// Success messages
export const commentDeletionSuccessMessage = 'Comment successfully deleted';
export const postDeletionSuccessMessage = 'Post successfully deleted';
export const passwordUpdateSuccessMessage = 'Password updated successfully';
export const userFollowSuccess = 'User followed successfully';


// Input Validation errors
export const wrongEmailOrPasswordMessage = 'Wrong email or password';
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
export const userTypeValidationMessage = 'Invalid user type';
export const textRequiredMessage = 'Text is required';
export const fileUploadNotFoundMessage = 'Uploaded file not found';
export const passwordsMustMatchMessage = 'Passwords must match';

// Action validation errors
export const postCommentMessage = 'Could not post comment';
export const saveCommentMessage = 'Could not save comment';
export const deleteCommentMessage = 'Could not delete comment';
export const postUpdateMessage = 'Could not update post';
export const postDeleteMessage = 'Could not delete post';
export const tokenExpiredMessage = 'Token expired or is invalid. Please log in';
export const alreadyLoggedInMessage = 'You are already logged in. Please log out to switch accounts.';
export const loginRequiredMessage = 'Login required';
export const unauthorizedActionMessage = 'You are not authorized to perform this action';
export const uploadFailedMessage = 'Failed to upload images';
export const avatarUpdateFailedMessage = 'Profile picture update failed. Invalid user';
export const friendshipWithSelfMessage = 'Cannot befriend self';
export const alreadyFriendsMessage = 'You are already friends';
export const cannotFollowSelfMessage = 'Cannot follow self';
export const followUnsucessfulMessage = 'Follow unsuccessful'

// Data fetching erros
export const fetchCommentsMessage = 'Could not fetch comments';
export const commentNotFoundMessage = 'Comment not found';
export const postNotFoundMessage = 'Post not found';
export const resourceNotFoundMessage = 'Resource not found';
export const userNotFoundMessage = 'User not found';
export const resourceOwnershipMessage = 'Error checking resource ownership';

// File errors
export const multerErrors = {
    LIMIT_PART_COUNT: 'Exceeded the maximum number of parts allowed in the request',
    LIMIT_FILE_SIZE: 'The file size exceeds the maximum allowed size',
    LIMIT_FILE_COUNT: 'Maximum of 5 files can be uploaded at once',
    LIMIT_FIELD_KEY: 'The field name is too long',
    LIMIT_FIELD_VALUE: 'The field value is too long',
    LIMIT_FIELD_COUNT: 'Exceeded the maximum number of fields allowed',
    LIMIT_UNEXPECTED_FILE: 'Maximum of 5 files can be uploaded at once',
    MISSING_FIELD_NAME: 'The field name is missing'
}
export const invalidFileFormatMessage = 'Invalid file format';
export const imageDeletionFailurMessage = 'Failed to delete image';
