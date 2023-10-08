/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
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
