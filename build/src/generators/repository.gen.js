"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRepository = exports.queryTextGenerator = exports.repositoryTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(require("node:fs"));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = require("change-case-all");
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = require("../helpers");
const libraries_1 = require("../libraries");
/* -------------------------------------------------------------------------- */
const repositoryTextGenerator = (moduleName) => {
    const modulePascalCase = (0, change_case_all_1.pascalCase)(moduleName);
    const moduleCamelCase = (0, change_case_all_1.camelCase)(moduleName);
    return `
/* ----------------------------- Custom Modules ----------------------------- */
import { postgresPool } from '../../bootstrap'
import ${moduleCamelCase}Queries from './${moduleCamelCase}.query'
/* -------------------------------------------------------------------------- */

class ${modulePascalCase}Repository {
    public healthCheck() {
        return new Promise((resolve, reject) => {
            const query = ${moduleCamelCase}Queries.pingDatabase()
            postgresPool.pool
                .query(query)
                .then(() => resolve('Everything Works Fine'))
                .catch(() => reject('Error on connecting database'))
        })
    }
}
        
export default new ${modulePascalCase}Repository()
    `;
};
exports.repositoryTextGenerator = repositoryTextGenerator;
const queryTextGenerator = () => {
    return `
/* ------------------------------ Dependencies ------------------------------ */
import SqlString from 'sqlstring'
/* -------------------------------------------------------------------------- */

export const pingDatabase = () => 'SELECT 1'
`;
};
exports.queryTextGenerator = queryTextGenerator;
const createRepository = (moduleName) => {
    const repositoryText = (0, exports.repositoryTextGenerator)(moduleName);
    const queryText = (0, exports.queryTextGenerator)();
    const repositoryFilePath = (0, helpers_1.getFilePath)(moduleName, libraries_1.FileNames.REPOSITORY);
    const queryFilePath = (0, helpers_1.getFilePath)(moduleName, libraries_1.FileNames.QUERY);
    try {
        node_fs_1.default.writeFileSync(repositoryFilePath, repositoryText);
        (0, helpers_1.logger)(`${(0, helpers_1.getFileName)(moduleName, libraries_1.FileNames.REPOSITORY)}\tis created`, libraries_1.LogTypes.SUCCESS);
        node_fs_1.default.writeFileSync(queryFilePath, queryText);
        (0, helpers_1.logger)(`${(0, helpers_1.getFileName)(moduleName, libraries_1.FileNames.QUERY)}\t\tis created`, libraries_1.LogTypes.SUCCESS);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.createRepository = createRepository;
