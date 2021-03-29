"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLogger = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
let transports = [
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.splat(), winston_1.default.format.timestamp(), winston_1.default.format.simple()),
    }),
];
if (process.env.NODE_ENV === 'production') {
    transports = [new winston_1.default.transports.Console()];
}
exports.logger = winston_1.default.createLogger({
    level: 'info',
    transports,
});
if (process.env.NODE_ENV === 'test') {
    exports.logger.pause();
}
function makeLogger(name) {
    return exports.logger.child({ module: name });
}
exports.makeLogger = makeLogger;
