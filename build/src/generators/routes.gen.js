"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = exports.routesTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(require("node:fs"));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = require("change-case-all");
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = require("../helpers");
const libraries_1 = require("../libraries");
/* -------------------------------------------------------------------------- */
const routesTextGenerator = (moduleName) => {
    (0, change_case_all_1.camelCase)(moduleName);
    return `
/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const router = express.Router()
/* -------------------------------------------------------------------------- */

/* ------------------------------- Controllers ------------------------------ */
import ${change_case_all_1.camelCase}Controller from './${change_case_all_1.camelCase}.controller'
/* -------------------------------------------------------------------------- */

router.post('/health-check', ${change_case_all_1.camelCase}Controller.healthCheck)

export default router
`;
};
exports.routesTextGenerator = routesTextGenerator;
const createRoutes = (moduleName) => {
    const routeText = (0, exports.routesTextGenerator)(moduleName);
    const filePath = (0, helpers_1.getFilePath)(moduleName, libraries_1.FileNames.ROUTES);
    try {
        node_fs_1.default.writeFileSync(filePath, routeText);
        (0, helpers_1.logger)(`${(0, helpers_1.getFileName)(moduleName, libraries_1.FileNames.ROUTES)}\t\tis created`, libraries_1.LogTypes.SUCCESS);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.createRoutes = createRoutes;
