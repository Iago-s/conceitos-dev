"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = void 0;
var User_1 = require("./services/User");
function create(req, res) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    var user = User_1.createUser({
        name: name,
        email: email,
        password: password,
    });
    return res.status(201).json({ user: user });
}
exports.create = create;
function update(req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var user = User_1.updateUser({ name: name });
    return res.status(200).json({ user: user });
}
exports.update = update;
