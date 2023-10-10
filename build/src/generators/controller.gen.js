"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createController = exports.controllerTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(require("node:fs"));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = require("change-case-all");
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = require("../helpers");
const libraries_1 = require("../libraries");
/* -------------------------------------------------------------------------- */
const controllerTextGenerator = (moduleName) => {
    const modulePascalCase = (0, change_case_all_1.pascalCase)(moduleName);
    const moduleCamelCase = (0, change_case_all_1.camelCase)(moduleName);
    return `
/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response } from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import Controller from '../../base/Controller'
import { BindInstance, Cache, Role } from '../../common/decorators'
import ${moduleCamelCase}Service from './${moduleCamelCase}.service'
/* -------------------------------------------------------------------------- */

@BindInstance
class ${modulePascalCase}Controller extends Controller {
    async healthCheck(req: Request, res: Response) {
        await super.handle(${moduleCamelCase}Service.healthCheck, undefined, req, res)
    }
}

export default new ${modulePascalCase}Controller()
    `;
};
exports.controllerTextGenerator = controllerTextGenerator;
const createController = (moduleName) => {
    const controllerText = (0, exports.controllerTextGenerator)(moduleName);
    const filePath = (0, helpers_1.getFilePath)(moduleName, libraries_1.FileNames.CONTROLLER);
    try {
        node_fs_1.default.writeFileSync(filePath, controllerText);
        (0, helpers_1.logger)(`${(0, helpers_1.getFileName)(moduleName, libraries_1.FileNames.CONTROLLER)}\tis created`, libraries_1.LogTypes.SUCCESS);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.createController = createController;
