"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/* ------------------------------ Dependencies ------------------------------ */
const chalk_1 = __importDefault(require("chalk"));
/* ----------------------------- Custom Modules ----------------------------- */
const libraries_1 = require("../libraries");
/* -------------------------------------------------------------------------- */
const logger = (message, type) => {
    const logMode = {
        [libraries_1.LogTypes.VERBOSE]: chalk_1.default.white,
        [libraries_1.LogTypes.SUCCESS]: chalk_1.default.green,
        [libraries_1.LogTypes.WARNING]: chalk_1.default.rgb(255, 255, 0),
        [libraries_1.LogTypes.DEBUG]: chalk_1.default.rgb(0, 0, 255),
        [libraries_1.LogTypes.ERROR]: chalk_1.default.red,
        [libraries_1.LogTypes.LOVE]: chalk_1.default.hex('#f6009b'),
    };
    console.log(logMode[type](message));
};
exports.logger = logger;
