/* ------------------------------ Dependencies ------------------------------ */
import changeCase from 'change-case-all'
/* -------------------------------------------------------------------------- */

export const controllerTextGenerator = (moduleName: string): string => {
    const pascalCase = changeCase.pascalCase(moduleName)
    const camelCase = changeCase.camelCase(moduleName)

    return `
        /* ------------------------------ Dependencies ------------------------------ */
        import { Request, Response } from 'express'
        /* ----------------------------- Custom Modules ----------------------------- */
        import Controller from '../../base/Controller'
        import { BindInstance, Cache, Role } from '../../common/decorators'
        import ${camelCase}Service from './${camelCase}.service'
        /* -------------------------------------------------------------------------- */
        
        @BindInstance
        class ${pascalCase}Controller extends Controller {
            async healthCheck(req: Request, res: Response) {
                await super.handle(${camelCase}Service.healthCheck, undefined, req, res)
            }
        }
        
        export default new ${pascalCase}Controller()
    `
}
