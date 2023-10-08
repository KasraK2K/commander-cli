/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
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
