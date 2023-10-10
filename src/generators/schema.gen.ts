/* ---------------------------- Node Dependencies --------------------------- */
import fs from 'node:fs'
import path from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase } from 'change-case-all'
/* ----------------------------- Custom Modules ----------------------------- */
import { getFileName, getFilePath, logger } from '../helpers'
import { FileNames, LogTypes } from '../libraries'
/* -------------------------------------------------------------------------- */

export const schemaTextGenerator = (): string => {
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
`
}

export const createSchema = (moduleName: string): boolean => {
    const schemaText = schemaTextGenerator()
    const filePath = getFilePath(moduleName, FileNames.SCHEMA)

    const modulePascalCase = pascalCase(moduleName)
    const validationFolder = path.resolve(
        process.cwd(),
        `src/modules/${modulePascalCase}/validation`,
    )
    try {
        fs.mkdirSync(validationFolder, { recursive: true })
        logger(`${getFileName(moduleName, FileNames.SCHEMA)}\tis created`, LogTypes.SUCCESS)
        fs.writeFileSync(filePath, schemaText)
        return true
    } catch (error) {
        console.log({ error })
        return false
    }
}
