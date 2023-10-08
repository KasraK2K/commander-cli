/* ------------------------------ Dependencies ------------------------------ */
import changeCase from 'change-case-all'
/* -------------------------------------------------------------------------- */

export const serviceTextGenerator = (moduleName: string): string => {
    const pascalCase = changeCase.pascalCase(moduleName)
    const camelCase = changeCase.camelCase(moduleName)

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
