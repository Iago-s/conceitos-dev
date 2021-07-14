"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var PORT = 3333;
var app = express_1.default();
var routes_1 = require("./routes");
app.get('/', function (req, res) { return res.send('<h1>Typescript</h1>'); });
app.post('/users', routes_1.create);
app.put('/users/:id', routes_1.update);
app.listen(PORT, function () { return console.log("Server started http://localhost:" + PORT); });
