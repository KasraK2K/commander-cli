/* ---------------------------- Node Dependencies --------------------------- */
import fs from 'node:fs'
/* ------------------------------ Dependencies ------------------------------ */
import { camelCase } from 'change-case-all'
/* ----------------------------- Custom Modules ----------------------------- */
import { getFileName, getFilePath, logger } from '../helpers'
import { FileNames, LogTypes } from '../libraries'
/* -------------------------------------------------------------------------- */

export const restClientTextGenerator = (moduleName: string): string => {
    camelCase(moduleName)

    return `
@module={{host}}/${camelCase}

###

# @name health-check
GET {{module}}/health-check
Content-Type: application/json
`
}

export const createRestClient = (moduleName: string): boolean => {
    const restText = restClientTextGenerator(moduleName)
    const filePath = getFilePath(moduleName, FileNames.REST)
    try {
        fs.writeFileSync(filePath, restText)
        logger(`${getFileName(moduleName, FileNames.REST)}\t\tis created`, LogTypes.SUCCESS)
        return true
    } catch {
        return false
    }
}
