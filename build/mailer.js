"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendConfirmationEmail = sendConfirmationEmail;
exports.sendResetPasswordEmail = sendResetPasswordEmail;
exports.sendPasswordChangedEmail = sendPasswordChangedEmail;

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var from = '"Type-Race" <info@typerace.com>';

function setup() {
    return _nodemailer2.default.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

function sendConfirmationEmail(user) {
    var tranport = setup();
    var email = {
        from: from,
        to: user.email,
        subject: "Welcome to Type-Race",
        text: "Welcome to Type-Race. Please, confirm your email.\n        " + user.generateConfirmationUrl() + "\n        "
    };

    tranport.sendMail(email);
}

function sendResetPasswordEmail(user) {
    var tranport = setup();
    var email = {
        from: from,
        to: user.email,
        subject: "Reset Password",
        text: " Please follow this link to reset your password.\n        " + user.generateResetPasswordLink() + "\n        "
    };

    tranport.sendMail(email);
}

function sendPasswordChangedEmail(user, password) {
    var tranport = setup();
    var email = {
        from: from,
        to: user.email,
        subject: "Password Changed",
        text: "Dear User,\n\nYou've Successsfully reset your password on Bookworm.\n\nYour new Password is : " + password + "\n\nIf you're receiving this email and have NOT actually reset your password,\ncontact us immediately at support@bookworm.com for assistance.\n\nSincerely,\nYor Type-Race Team"
    };

    tranport.sendMail(email);
}
//# sourceMappingURL=mailer.js.map