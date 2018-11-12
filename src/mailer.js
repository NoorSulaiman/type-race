import nodemailer from "nodemailer";

const from = '"Type-Race" <info@typerace.com>';

function setup() {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

export function sendConfirmationEmail(user) {
    const tranport = setup();
    const email = {
        from,
        to: user.email,
        subject: "Welcome to Type-Race",
        text: `Welcome to Type-Race. Please, confirm your email.
        ${user.generateConfirmationUrl()}
        `
    };

    tranport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
    const tranport = setup();
    const email = {
        from,
        to: user.email,
        subject: "Reset Password",
        text: ` Please follow this link to reset your password.
        ${user.generateResetPasswordLink()}
        `
    };

    tranport.sendMail(email);
}

export function sendPasswordChangedEmail(user, password) {
    const tranport = setup();
    const email = {
        from,
        to: user.email,
        subject: "Password Changed",
        text: `Dear User,

You've Successsfully reset your password on Bookworm.

Your new Password is : ${password}

If you're receiving this email and have NOT actually reset your password,
contact us immediately at support@bookworm.com for assistance.

Sincerely,
Yor Type-Race Team`
    };

    tranport.sendMail(email);
}

