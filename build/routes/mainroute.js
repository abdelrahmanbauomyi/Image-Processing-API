"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validation_1 = __importDefault(require("../middelwears/validation"));
var resizing_1 = __importDefault(require("../middelwears/resizing"));
var img_router = express_1.default.Router();
img_router.get('/imgs', validation_1.default, resizing_1.default, function (req, res) {
    console.log('router working');
});
exports.default = img_router;
