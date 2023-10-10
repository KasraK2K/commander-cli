"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = exports.rollback = exports.createModuleFolder = exports.checkFolderExistence = void 0;
/* ------------------------------ Dependencies ------------------------------ */
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = require("change-case-all");
/* ----------------------------- Custom Modules ----------------------------- */
const libraries_1 = require("../libraries");
const logger_helper_1 = require("./logger.helper");
const _1 = require(".");
/* -------------------------------------------------------------------------- */
const checkFolderExistence = (moduleName) => {
    const modulePascalCase = (0, change_case_all_1.pascalCase)(moduleName);
    return node_fs_1.default.existsSync(node_path_1.default.resolve(process.cwd(), `src/modules/${modulePascalCase}`));
};
exports.checkFolderExistence = checkFolderExistence;
const createModuleFolder = (moduleName) => {
    const modulePath = (0, _1.getModuleFolderPath)(moduleName);
    try {
        node_fs_1.default.mkdirSync(modulePath, { recursive: true });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.createModuleFolder = createModuleFolder;
const rollback = (moduleName) => {
    (0, logger_helper_1.logger)(`[rollback]: Can not create ${moduleName} module.`, libraries_1.LogTypes.ERROR);
    const modulePath = (0, _1.getModuleFolderPath)(moduleName);
    node_fs_1.default.rmSync(modulePath, { recursive: true, force: true });
};
exports.rollback = rollback;
const getFileName = (moduleName, fileName) => {
    const moduleCamelCaseName = (0, change_case_all_1.camelCase)(moduleName);
    const filePaths = {
        [libraries_1.FileNames.ROUTES]: `${moduleCamelCaseName}.routes.ts`,
        [libraries_1.FileNames.CONTROLLER]: `${moduleCamelCaseName}.controller.ts`,
        [libraries_1.FileNames.SCHEMA]: `validation/schema.ts`,
        [libraries_1.FileNames.SERVICE]: `${moduleCamelCaseName}.service.ts`,
        [libraries_1.FileNames.REPOSITORY]: `${moduleCamelCaseName}.repository.ts`,
        [libraries_1.FileNames.QUERY]: `${moduleCamelCaseName}.query.ts`,
        [libraries_1.FileNames.REST]: `_rest.http`,
        [libraries_1.FileNames.MODULE]: '',
    };
    return filePaths[fileName];
};
exports.getFileName = getFileName;
