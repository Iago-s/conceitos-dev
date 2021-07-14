"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = void 0;
function createUser(_a) {
    var name = _a.name, email = _a.email, password = _a.password;
    var user = {
        name: name,
        email: email,
        password: password,
    };
    return user;
}
exports.createUser = createUser;
function updateUser(_a) {
    var name = _a.name;
    var user = { name: name, email: 'email@email.com', password: 'password' };
    return user;
}
exports.updateUser = updateUser;
