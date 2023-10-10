"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createService = exports.serviceTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(require("node:fs"));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = require("change-case-all");
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = require("../helpers");
const libraries_1 = require("../libraries");
/* -------------------------------------------------------------------------- */
const serviceTextGenerator = (moduleName) => {
    const modulePascalCase = (0, change_case_all_1.pascalCase)(moduleName);
    const moduleCamelCase = (0, change_case_all_1.camelCase)(moduleName);
    return `
/* ----------------------------- Custom Modules ----------------------------- */
import ${moduleCamelCase}Repository from './${moduleCamelCase}.repository'
/* -------------------------------------------------------------------------- */

class ${modulePascalCase}Service {
    healthCheck() {
        return new Promise((resolve, reject) => {
            ${moduleCamelCase}Repository.healthCheck().then(resolve).catch(reject)
        })
    }
}

export default new ${modulePascalCase}Service()
`;
};
exports.serviceTextGenerator = serviceTextGenerator;
const createService = (moduleName) => {
    const serviceText = (0, exports.serviceTextGenerator)(moduleName);
    const filePath = (0, helpers_1.getFilePath)(moduleName, libraries_1.FileNames.SERVICE);
    try {
        node_fs_1.default.writeFileSync(filePath, serviceText);
        (0, helpers_1.logger)(`${(0, helpers_1.getFileName)(moduleName, libraries_1.FileNames.SERVICE)}\t\tis created`, libraries_1.LogTypes.SUCCESS);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.createService = createService;
