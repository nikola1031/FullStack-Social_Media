"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const Constants_1 = require("../Constants");
const userTypes = ['user', 'admin'];
const genders = ['male', 'female'];
const photoSchema = new mongoose_1.Schema({
    dateAdded: {
        type: Date,
        default: Date.now
    },
    url: { type: String, required: true }
});
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: [true, Constants_1.allFieldsRequiredValidationMessage], unique: [true, Constants_1.accountExistsValidationMessage], match: [Constants_1._emailPattern, Constants_1.usernameValidationMessage] },
    email: { type: String, required: [true, Constants_1.allFieldsRequiredValidationMessage], unique: [true, Constants_1.accountExistsValidationMessage], match: [Constants_1._usernamePattern, Constants_1.emailValidationMessage] },
    password: { type: String, required: [true, Constants_1.allFieldsRequiredValidationMessage], match: [Constants_1._passwordPattern, Constants_1.passwordValidationMessage] },
    gender: { type: String, required: [true, Constants_1.allFieldsRequiredValidationMessage], enum: { values: genders, message: Constants_1.genderValidationMessage } },
    bio: { type: String, default: '', maxLength: [200, Constants_1.bioLengthValidationMessage] },
    profilePicture: { type: String, default: '' },
    photos: { type: [photoSchema], default: [] },
    friendRequests: {
        sent: { type: [mongoose_1.Types.ObjectId], ref: 'User', default: [] },
        received: { type: [mongoose_1.Types.ObjectId], ref: 'User', default: [] },
        default: {},
    },
    friends: { type: [mongoose_1.Types.ObjectId], ref: 'User', default: [] },
    followers: { type: [mongoose_1.Types.ObjectId], ref: 'User', default: [] },
    following: { type: [mongoose_1.Types.ObjectId], ref: 'User', default: [] },
    isVerified: { type: Boolean, default: false },
    role: { type: String, default: 'user', enum: { values: userTypes, message: Constants_1.userTypeValidationMessage },
    },
}, { timestamps: true });
userSchema.index({ email: 1 }, { collation: { locale: 'en', strength: 1 } });
userSchema.index({ username: 1 }, { collation: { locale: 'en', strength: 1 } });
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.js.map