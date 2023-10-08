/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
/* -------------------------------------------------------------------------- */

export const serviceTextGenerator = (moduleName: string): string => {
    pascalCase(moduleName)
    camelCase(moduleName)

    return `
        /* ----------------------------- Custom Modules ----------------------------- */
        import ${camelCase}Repository from './${camelCase}.repository'
        /* -------------------------------------------------------------------------- */
        
        class ${pascalCase}Service {
            healthCheck() {
                return new Promise((resolve, reject) => {
                    ${camelCase}Repository.healthCheck().then(resolve).catch(reject)
                })
            }
        }
        
        export default new ${pascalCase}Service()
    `
}
