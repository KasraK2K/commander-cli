/* ------------------------------ Dependencies ------------------------------ */
import changeCase from 'change-case-all'
/* -------------------------------------------------------------------------- */

export const restClientTextGenerator = (moduleName: string): string => {
    const camelCase = changeCase.camelCase(moduleName)

    return `
        @module={{host}}/${camelCase}

        ###
        
        # @name health-check
        GET {{module}}/health-check
        Content-Type: application/json
    `
}
