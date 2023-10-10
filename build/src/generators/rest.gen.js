"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRestClient = exports.restClientTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(require("node:fs"));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = require("change-case-all");
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = require("../helpers");
const libraries_1 = require("../libraries");
/* -------------------------------------------------------------------------- */
const restClientTextGenerator = (moduleName) => {
    (0, change_case_all_1.camelCase)(moduleName);
    return `
@module={{host}}/${change_case_all_1.camelCase}

###

# @name health-check
GET {{module}}/health-check
Content-Type: application/json
`;
};
exports.restClientTextGenerator = restClientTextGenerator;
const createRestClient = (moduleName) => {
    const restText = (0, exports.restClientTextGenerator)(moduleName);
    const filePath = (0, helpers_1.getFilePath)(moduleName, libraries_1.FileNames.REST);
    try {
        node_fs_1.default.writeFileSync(filePath, restText);
        (0, helpers_1.logger)(`${(0, helpers_1.getFileName)(moduleName, libraries_1.FileNames.REST)}\t\tis created`, libraries_1.LogTypes.SUCCESS);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.createRestClient = createRestClient;
