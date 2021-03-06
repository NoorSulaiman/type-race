import express from 'express';
import User from '../models/User';
import parseErrors from "../utils/parseErrors";
import { sendResetPasswordEmail, sendPasswordChangedEmail } from '../mailer';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/", (req, res) => {
    const { credentials } = req.body;
    User.findOne({ email: credentials.email }).then(user => {
        if (user && user.isValidPassword(credentials.password)) {
            res.json({ user: user.toAuthJSON() });
        } else {
            res.status(400).json({ errors: { global: "invalid credentials" } });
        }
    });
});

router.post("/confirmation", (req, res) => {
    const token = req.body.token;
    User.findOneAndUpdate(
        { confirmationToken: token },
        { confirmationToken: "", confirmed: true },
        { new: true })
        .then(user =>
            user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
        );
});

router.post("/reset_password_request", (req, res) => {
    const { email } = req.body;
    User.findOne({ email }).then(user => {
        if (user) {
            user.setResetPasswordToken()
            user.save().then(user => {
                sendResetPasswordEmail(user);
                res.json({});
            }).catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
        } else {
            res.status(400).json({ errors: { global: "Sorry somthing went wrong!" } })
        }
    });

});

router.post("/validate_token", (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.status(401).json({})
        } else { res.json({}) };
    });

});

router.post("/update_password", (req, res) => {
    const { password, token } = req.body.data;
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(401).json({ errors: { global: "Invalid token" } })
        } else {
            User.findOneAndUpdate(
                { resetPasswordToken: token },
                { resetPasswordToken: "" },
                { new: true })
                .then(user => {
                    if (user) {
                        user.setPassword(password)
                        user.save().then(user => {
                            sendPasswordChangedEmail(user, password)
                            res.json({})
                        })
                    } else { res.status(404).json({ errors: { global: "Invalid token" } }) }
                });
        }
    });
});

export default router;