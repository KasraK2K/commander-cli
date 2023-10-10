"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePath = exports.getModuleFolderPath = void 0;
/* ------------------------------ Node Modules ------------------------------ */
const node_path_1 = __importDefault(require("node:path"));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = require("change-case-all");
/* ----------------------------- Custom Modules ----------------------------- */
const libraries_1 = require("../libraries");
const _1 = require(".");
/* -------------------------------------------------------------------------- */
const getModuleFolderPath = (moduleName) => {
    const modulePascalCase = (0, change_case_all_1.pascalCase)(moduleName);
    return node_path_1.default.resolve(process.cwd(), `src/modules/${modulePascalCase}`);
};
exports.getModuleFolderPath = getModuleFolderPath;
const getFilePath = (moduleName, fileName) => {
    const modulePascalCase = (0, change_case_all_1.pascalCase)(moduleName);
    const finalPath = fileName === libraries_1.FileNames.MODULE
        ? ''
        : node_path_1.default.resolve(process.cwd(), `src/modules/${modulePascalCase}/${(0, _1.getFileName)(moduleName, fileName)}`);
    return finalPath;
};
exports.getFilePath = getFilePath;
