import { Schema, model, Types } from 'mongoose';
import { 
    _usernamePattern, 
    _emailPattern, 
    _passwordPattern, 
    emailValidationMessage, 
    usernameValidationMessage, 
    passwordValidationMessage,
    allFieldsRequiredValidationMessage,
    accountExistsValidationMessage,
    bioLengthValidationMessage,
    genderValidationMessage,
    userTypeValidationMessage
} from '../Constants';

const userTypes = ['user', 'admin'];
const genders = ['male', 'female']

const photoSchema: Schema = new Schema({
    dateAdded: {
        type: Date,
        default: Date.now
    },
    url: {type: String, required: true}
})

const userSchema: Schema = new Schema(
    {
        username: { type: String, required: [true, allFieldsRequiredValidationMessage], unique: [true, accountExistsValidationMessage], match:[ _usernamePattern, usernameValidationMessage] },
        email: { type: String, required: [true, allFieldsRequiredValidationMessage], unique: [true, accountExistsValidationMessage], match:[ _emailPattern, emailValidationMessage] },
        password: { type: String, required: [true, allFieldsRequiredValidationMessage], match: [_passwordPattern, passwordValidationMessage] },
        gender: {type: String, required: [true, allFieldsRequiredValidationMessage], enum: { values: genders, message: genderValidationMessage }},
        bio: { type: String, default: '', maxLength: [200, bioLengthValidationMessage] },
        profilePicture: { type: String, default: '' },
        photos: {type: [photoSchema], default: []},
        friendRequests: {
            sent: {type: [Types.ObjectId], ref: 'User', default: []},
            received: {type: [Types.ObjectId], ref: 'User', default: []},
            default: {},
        },
        friends: { type: [Types.ObjectId], ref: 'User', default: [] },
        followers: { type: [Types.ObjectId], ref: 'User', default: [] },
        following: { type: [Types.ObjectId], ref: 'User', default: [] },
        isVerified: { type: Boolean, default: false },
        role: { type: String, default: 'user', enum: { values: userTypes, message: userTypeValidationMessage },
        },
    },
    { timestamps: true }
);

userSchema.index({ email: 1 }, { collation: { locale: 'en', strength: 1 } });
userSchema.index({ username: 1 }, { collation: { locale: 'en', strength: 1 } });

export const User = model('User', userSchema);
