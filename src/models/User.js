import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import uniqueValidator from 'mongoose-unique-validator';
// add uniqness and email validations 

dotenv.config()
const schema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: "" },
    resetPasswordToken: { type: String, default: "" },
    points: { type: Number, default: 0 }
},
    { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10)
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT();
};
schema.methods.setResetPasswordToken = function setResetPasswordToken() {
    this.resetPasswordToken = this.generateResetPasswordToken();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
    return `${process.env.HOST}/reset_password/${this.resetPasswordToken}`
};

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        {
            username: this.username,
            email: this.email,
            confirmed: this.confirmed
        },
        process.env.JWT_SECRET
    )
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
    return jwt.sign(
        {
            email: this.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
};


schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        username: this.username,
        email: this.email,
        confirmed: this.confirmed,
        token: this.generateJWT()

    }
}

schema.plugin(uniqueValidator, { message: "This email is already taken" })

export default mongoose.model('User', schema);