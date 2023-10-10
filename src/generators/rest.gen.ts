/* ---------------------------- Node Dependencies --------------------------- */
import fs from 'node:fs'
/* ------------------------------ Dependencies ------------------------------ */
import { camelCase } from 'change-case-all'
/* ----------------------------- Custom Modules ----------------------------- */
import { getFilePath } from '../helpers'
import { FileNames } from '../libraries'
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
        return true
    } catch {
        return false
    }
}
