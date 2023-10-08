/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
/* -------------------------------------------------------------------------- */

export const restClientTextGenerator = (moduleName: string): string => {
    camelCase(moduleName)

    return `
        @module={{host}}/${camelCase}

        ###
        
        # @name health-check
        GET {{module}}/health-check
        Content-Type: application/json
    `
}
