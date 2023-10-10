/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 736:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createController = exports.controllerTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(__webpack_require__(561));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = __webpack_require__(571);
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = __webpack_require__(489);
const libraries_1 = __webpack_require__(176);
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


/***/ }),

/***/ 792:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(988), exports);
__exportStar(__webpack_require__(736), exports);
__exportStar(__webpack_require__(569), exports);
__exportStar(__webpack_require__(422), exports);
__exportStar(__webpack_require__(501), exports);
__exportStar(__webpack_require__(328), exports);
__exportStar(__webpack_require__(24), exports);


/***/ }),

/***/ 24:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createModule = void 0;
/* ----------------------------- Custom Modules ----------------------------- */
const _1 = __webpack_require__(792);
const helpers_1 = __webpack_require__(489);
/* -------------------------------------------------------------------------- */
const createModule = (moduleName) => {
    let error = false;
    // TODO : Create all files
    if (!(0, _1.createController)(moduleName))
        error = true;
    if (!(0, _1.createSchema)(moduleName))
        error = true;
    if (!(0, _1.createService)(moduleName))
        error = true;
    if (!(0, _1.createRepository)(moduleName))
        error = true;
    if (!(0, _1.createRestClient)(moduleName))
        error = true;
    if (!(0, _1.createRoutes)(moduleName))
        error = true;
    if (error)
        (0, helpers_1.rollback)(moduleName);
};
exports.createModule = createModule;


/***/ }),

/***/ 501:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRepository = exports.queryTextGenerator = exports.repositoryTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(__webpack_require__(561));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = __webpack_require__(571);
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = __webpack_require__(489);
const libraries_1 = __webpack_require__(176);
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


/***/ }),

/***/ 328:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRestClient = exports.restClientTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(__webpack_require__(561));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = __webpack_require__(571);
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = __webpack_require__(489);
const libraries_1 = __webpack_require__(176);
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


/***/ }),

/***/ 988:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRoutes = exports.routesTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(__webpack_require__(561));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = __webpack_require__(571);
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = __webpack_require__(489);
const libraries_1 = __webpack_require__(176);
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


/***/ }),

/***/ 569:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSchema = exports.schemaTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(__webpack_require__(561));
const node_path_1 = __importDefault(__webpack_require__(411));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = __webpack_require__(571);
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = __webpack_require__(489);
const libraries_1 = __webpack_require__(176);
/* -------------------------------------------------------------------------- */
const schemaTextGenerator = () => {
    return `
import { archiveSchema, listSchema } from 'src/common/helpers/validator.schemas'

function getUpsertSchema(type: string) {
    const schema = {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
            data: {
                type: 'object',
                required: type === 'update' ? ['id'] : ['name'],
                additionalProperties: false,
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string', sanitize: (data) => data.substring(0, 50) },
                },
            },
        },
    }

    if (type === 'update') {
        schema.properties.data.properties['id'] = { type: 'integer' }
    }
    return schema
}

export default {
    insert: getUpsertSchema('insert'),
    update: getUpsertSchema('update'),
    archive: archiveSchema,
    portalList: listSchema,
}    
`;
};
exports.schemaTextGenerator = schemaTextGenerator;
const createSchema = (moduleName) => {
    const schemaText = (0, exports.schemaTextGenerator)();
    const filePath = (0, helpers_1.getFilePath)(moduleName, libraries_1.FileNames.SCHEMA);
    const modulePascalCase = (0, change_case_all_1.pascalCase)(moduleName);
    const validationFolder = node_path_1.default.resolve(process.cwd(), `src/modules/${modulePascalCase}/validation`);
    try {
        node_fs_1.default.mkdirSync(validationFolder, { recursive: true });
        (0, helpers_1.logger)(`${(0, helpers_1.getFileName)(moduleName, libraries_1.FileNames.SCHEMA)}\tis created`, libraries_1.LogTypes.SUCCESS);
        node_fs_1.default.writeFileSync(filePath, schemaText);
        return true;
    }
    catch (error) {
        console.log({ error });
        return false;
    }
};
exports.createSchema = createSchema;


/***/ }),

/***/ 422:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createService = exports.serviceTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(__webpack_require__(561));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = __webpack_require__(571);
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = __webpack_require__(489);
const libraries_1 = __webpack_require__(176);
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


/***/ }),

/***/ 37:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFileName = exports.rollback = exports.createModuleFolder = exports.checkFolderExistence = void 0;
/* ------------------------------ Dependencies ------------------------------ */
const node_fs_1 = __importDefault(__webpack_require__(561));
const node_path_1 = __importDefault(__webpack_require__(411));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = __webpack_require__(571);
/* ----------------------------- Custom Modules ----------------------------- */
const libraries_1 = __webpack_require__(176);
const logger_helper_1 = __webpack_require__(683);
const _1 = __webpack_require__(489);
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


/***/ }),

/***/ 489:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(109), exports);
__exportStar(__webpack_require__(683), exports);
__exportStar(__webpack_require__(37), exports);


/***/ }),

/***/ 683:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = void 0;
/* ------------------------------ Dependencies ------------------------------ */
const chalk_1 = __importDefault(__webpack_require__(22));
/* ----------------------------- Custom Modules ----------------------------- */
const libraries_1 = __webpack_require__(176);
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


/***/ }),

/***/ 109:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFilePath = exports.getModuleFolderPath = void 0;
/* ------------------------------ Node Modules ------------------------------ */
const node_path_1 = __importDefault(__webpack_require__(411));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = __webpack_require__(571);
/* ----------------------------- Custom Modules ----------------------------- */
const libraries_1 = __webpack_require__(176);
const _1 = __webpack_require__(489);
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


/***/ }),

/***/ 805:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogTypes = exports.FileNames = void 0;
var FileNames;
(function (FileNames) {
    FileNames["ROUTES"] = "routes";
    FileNames["CONTROLLER"] = "controller";
    FileNames["SCHEMA"] = "schema";
    FileNames["SERVICE"] = "service";
    FileNames["REPOSITORY"] = "repository";
    FileNames["QUERY"] = "query";
    FileNames["MODULE"] = "module";
    FileNames["REST"] = "rest";
})(FileNames || (exports.FileNames = FileNames = {}));
var LogTypes;
(function (LogTypes) {
    LogTypes[LogTypes["VERBOSE"] = 0] = "VERBOSE";
    LogTypes[LogTypes["SUCCESS"] = 1] = "SUCCESS";
    LogTypes[LogTypes["WARNING"] = 2] = "WARNING";
    LogTypes[LogTypes["DEBUG"] = 3] = "DEBUG";
    LogTypes[LogTypes["ERROR"] = 4] = "ERROR";
    LogTypes[LogTypes["LOVE"] = 5] = "LOVE";
})(LogTypes || (exports.LogTypes = LogTypes = {}));


/***/ }),

/***/ 176:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(805), exports);
__exportStar(__webpack_require__(926), exports);


/***/ }),

/***/ 926:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 22:
/***/ ((module) => {

module.exports = require("chalk");

/***/ }),

/***/ 571:
/***/ ((module) => {

module.exports = require("change-case-all");

/***/ }),

/***/ 304:
/***/ ((module) => {

module.exports = require("commander");

/***/ }),

/***/ 561:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 411:
/***/ ((module) => {

module.exports = require("node:path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
/* ------------------------------ Dependencies ------------------------------ */
const commander_1 = __webpack_require__(304);
const generators_1 = __webpack_require__(792);
const helpers_1 = __webpack_require__(489);
/* -------------------------------- Constants ------------------------------- */
const program = new commander_1.Command();
/* -------------------------------------------------------------------------- */
/* --------------------------- Generate Controller -------------------------- */
program
    .name('Generate')
    .description('Generate command help to create file.')
    .command('generate')
    .option('--routes', 'Create route file.')
    .option('-c, --controller', 'Create controller file.')
    .option('--schema', 'Create schema file.')
    .option('-s, --service', 'Create service file.')
    .option('-r, --repository', 'Create repository file.')
    .option('--rest', 'Create rest client files.')
    .option('-m, --module', 'Create all files.')
    .argument('moduleName', 'Name for file eq: user -> User<Controller, Service, Repository>')
    .action((moduleName, options) => {
    // Check module folder existence and create it if not exist
    const isFolderExist = (0, helpers_1.checkFolderExistence)(moduleName);
    if (!isFolderExist)
        (0, helpers_1.createModuleFolder)(moduleName);
    if (options.module)
        (0, generators_1.createModule)(moduleName);
    else {
        const fileCreator = {
            routes: generators_1.createRoutes,
            controller: generators_1.createController,
            schema: generators_1.createSchema,
            service: generators_1.createService,
            repository: generators_1.createRepository,
            rest: generators_1.createRestClient,
        };
        // Convert option names to lowercase
        const lowercaseOptions = Object.keys(options).map((opt) => opt.toLowerCase());
        for (const opt of lowercaseOptions) {
            fileCreator[opt](moduleName);
        }
    }
});
/* -------------------------------------------------------------------------- */
program.parse(process.argv);

})();

/******/ })()
;