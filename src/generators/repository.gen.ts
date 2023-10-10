/* ---------------------------- Node Dependencies --------------------------- */
import fs from 'node:fs'
/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
/* ----------------------------- Custom Modules ----------------------------- */
import { getFileName, getFilePath, logger } from '../helpers'
import { FileNames, LogTypes } from '../libraries'
/* -------------------------------------------------------------------------- */

export const repositoryTextGenerator = (moduleName: string): string => {
    const modulePascalCase = pascalCase(moduleName)
    const moduleCamelCase = camelCase(moduleName)

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
    `
}

export const queryTextGenerator = (): string => {
    return `
/* ------------------------------ Dependencies ------------------------------ */
import SqlString from 'sqlstring'
/* -------------------------------------------------------------------------- */

export const pingDatabase = () => 'SELECT 1'
`
}

export const createRepository = (moduleName: string): boolean => {
    const repositoryText = repositoryTextGenerator(moduleName)
    const queryText = queryTextGenerator()

    const repositoryFilePath = getFilePath(moduleName, FileNames.REPOSITORY)
    const queryFilePath = getFilePath(moduleName, FileNames.QUERY)
    try {
        fs.writeFileSync(repositoryFilePath, repositoryText)
        logger(`${getFileName(moduleName, FileNames.REPOSITORY)}\tis created`, LogTypes.SUCCESS)
        fs.writeFileSync(queryFilePath, queryText)
        logger(`${getFileName(moduleName, FileNames.QUERY)}\t\tis created`, LogTypes.SUCCESS)
        return true
    } catch {
        return false
    }
}
