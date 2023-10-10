"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = exports.schemaTextGenerator = void 0;
/* ---------------------------- Node Dependencies --------------------------- */
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
/* ------------------------------ Dependencies ------------------------------ */
const change_case_all_1 = require("change-case-all");
/* ----------------------------- Custom Modules ----------------------------- */
const helpers_1 = require("../helpers");
const libraries_1 = require("../libraries");
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
