import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import uniqueValidator from 'mongoose-unique-validator';
// add uniqness and email validations 

dotenv.config()
const schema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true },
    confirmed: { type: Boolean, default: false }
},
    { timestampes: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10)
}

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        { email: this.email },
        process.env.JWT_secret
    )
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        confirmed: this.confirmed,
        token: this.generateJWT()

    }
}

schema.plugin(uniqueValidator, { message: "This email is already taken" })

export default mongoose.model('User', schema);