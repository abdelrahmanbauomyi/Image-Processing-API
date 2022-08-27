"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mainroute_1 = __importDefault(require("./routes/mainroute"));
var app = (0, express_1.default)();
var port = 8000;
app.listen(port, function () {
    console.log("listening on port :".concat(port));
});
app.use('/api', mainroute_1.default);
