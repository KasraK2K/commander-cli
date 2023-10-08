/* ------------------------------ Dependencies ------------------------------ */
import caseAnything from 'case-anything'
/* -------------------------------------------------------------------------- */

export const serviceTextGenerator = (moduleName: string): string => {
    const pascalCase = caseAnything.pascalCase(moduleName)
    const camelCase = caseAnything.camelCase(moduleName)

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
