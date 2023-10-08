/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
/* -------------------------------------------------------------------------- */

export const repositoryTextGenerator = (moduleName: string): string => {
    pascalCase(moduleName)
    camelCase(moduleName)

    return `
        /* ----------------------------- Custom Modules ----------------------------- */
        import { postgresPool } from '../../bootstrap'
        import ${camelCase}Queries from './${camelCase}.query'
        /* -------------------------------------------------------------------------- */
        
        class ${pascalCase}Repository {
            public healthCheck() {
                return new Promise((resolve, reject) => {
                    const query = ${camelCase}Queries.pingDatabase()
                    postgresPool.pool
                        .query(query)
                        .then(() => resolve('Everything Works Fine'))
                        .catch(() => reject('Error on connecting database'))
                })
            }
        }
        
        export default new ${pascalCase}Repository()
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
