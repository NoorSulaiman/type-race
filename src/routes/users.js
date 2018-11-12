import express from "express";
import User from "../models/User";
import parseErrors from "../utils/parseErrors";
import { sendConfirmationEmail } from "../mailer";


const router = express.Router();

router.post("/", (req, res) => {
    const { email, password, username } = req.body.user;
    const user = new User({ username, email });
    user.setPassword(password);
    user.setConfirmationToken();
    user.save().then(userRecord => {
        sendConfirmationEmail(userRecord);
        res.json({ user: userRecord.toAuthJSON() });
    }).catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post("/reconfirm", (req, res) => {
    const { email } = req.body;
    User.findOne({ email }).then(user => {
        sendConfirmationEmail(user)
    }).catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
})

router.post("/points", (req, res) => {
    const { data } = req.body;
    User.findOneAndUpdate(
        { email: data.email },
        { $inc: { points: data.points } },
        { new: true }
    ).catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
})
router.get("/", (req, res) => {
    User.find({}).then(users => {
        let usersArray = [];
        users.map(user => {
            usersArray.push({ username: user.username, points: user.points })
        })
        res.json({ users: usersArray })
    }).catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
})
export default router;