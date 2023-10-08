/* ------------------------------ Dependencies ------------------------------ */
import caseAnything from 'case-anything'
/* -------------------------------------------------------------------------- */

export const routesTextGenerator = (moduleName: string): string => {
    const camelCase = caseAnything.camelCase(moduleName)

    return `
        /* ------------------------------ Dependencies ------------------------------ */
        import express from 'express'
        /* -------------------------------------------------------------------------- */
        
        /* -------------------------------- Constants ------------------------------- */
        const router = express.Router()
        /* -------------------------------------------------------------------------- */
        
        /* ------------------------------- Controllers ------------------------------ */
        import ${camelCase}Controller from './${camelCase}.controller'
        /* -------------------------------------------------------------------------- */
        
        router.post('/health-check', ${camelCase}Controller.healthCheck)
        
        export default router
    `
}
