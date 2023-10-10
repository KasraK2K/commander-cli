/* ---------------------------- Node Dependencies --------------------------- */
import fs from 'node:fs'
/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
/* ----------------------------- Custom Modules ----------------------------- */
import { getFilePath } from '../helpers'
import { FileNames } from '../libraries'
/* -------------------------------------------------------------------------- */

export const serviceTextGenerator = (moduleName: string): string => {
    const modulePascalCase = pascalCase(moduleName)
    const moduleCamelCase = camelCase(moduleName)

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
`
}

export const createService = (moduleName: string): boolean => {
    const serviceText = serviceTextGenerator(moduleName)
    const filePath = getFilePath(moduleName, FileNames.SERVICE)
    try {
        fs.writeFileSync(filePath, serviceText)
        return true
    } catch {
        return false
    }
}
