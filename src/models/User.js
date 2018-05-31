import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// add uniqness and email validations 

dotenv.config()
const schema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true },
    passwordHash: { type: String, required: true }
},
    { timestampes: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
};

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        { email: this.email },
        process.env.JWT_secret
    )
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        token: this.generateJWT()
    }
}

export default mongoose.model('User', schema);