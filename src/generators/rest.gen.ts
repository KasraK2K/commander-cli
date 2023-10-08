/* ------------------------------ Dependencies ------------------------------ */
import caseAnything from 'case-anything'
/* -------------------------------------------------------------------------- */

export const restClientTextGenerator = (moduleName: string): string => {
    const camelCase = caseAnything.camelCase(moduleName)

    return `
        @module={{host}}/${camelCase}

        ###
        
        # @name health-check
        GET {{module}}/health-check
        Content-Type: application/json
    `
}
