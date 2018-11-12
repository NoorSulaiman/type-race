"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

var _parseErrors = require("../utils/parseErrors");

var _parseErrors2 = _interopRequireDefault(_parseErrors);

var _mailer = require("../mailer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/", function (req, res) {
    var _req$body$user = req.body.user,
        email = _req$body$user.email,
        password = _req$body$user.password,
        username = _req$body$user.username;

    var user = new _User2.default({ username: username, email: email });
    user.setPassword(password);
    user.setConfirmationToken();
    user.save().then(function (userRecord) {
        (0, _mailer.sendConfirmationEmail)(userRecord);
        res.json({ user: userRecord.toAuthJSON() });
    }).catch(function (err) {
        return res.status(400).json({ errors: (0, _parseErrors2.default)(err.errors) });
    });
});

router.post("/reconfirm", function (req, res) {
    var email = req.body.email;

    _User2.default.findOne({ email: email }).then(function (user) {
        (0, _mailer.sendConfirmationEmail)(user);
    }).catch(function (err) {
        return res.status(400).json({ errors: (0, _parseErrors2.default)(err.errors) });
    });
});

router.post("/points", function (req, res) {
    var data = req.body.data;

    _User2.default.findOneAndUpdate({ email: data.email }, { $inc: { points: data.points } }, { new: true }).catch(function (err) {
        return res.status(400).json({ errors: (0, _parseErrors2.default)(err.errors) });
    });
});
router.get("/", function (req, res) {
    _User2.default.find({}).then(function (users) {
        var usersArray = [];
        users.map(function (user) {
            usersArray.push({ username: user.username, points: user.points });
        });
        res.json({ users: usersArray });
    }).catch(function (err) {
        return res.status(400).json({ errors: (0, _parseErrors2.default)(err.errors) });
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map