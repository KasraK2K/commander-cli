/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
/* -------------------------------------------------------------------------- */

export const controllerTextGenerator = (moduleName: string): string => {
    const modulePascalCase = pascalCase(moduleName)
    const moduleCamelCase = camelCase(moduleName)

    return `
        /* ------------------------------ Dependencies ------------------------------ */
        import { Request, Response } from 'express'
        /* ----------------------------- Custom Modules ----------------------------- */
        import Controller from '../../base/Controller'
        import { BindInstance, Cache, Role } from '../../common/decorators'
        import ${moduleCamelCase}Service from './${moduleCamelCase}.service'
        /* -------------------------------------------------------------------------- */
        
        @BindInstance
        class ${modulePascalCase}Controller extends Controller {
            async healthCheck(req: Request, res: Response) {
                await super.handle(${moduleCamelCase}Service.healthCheck, undefined, req, res)
            }
        }
        
        export default new ${modulePascalCase}Controller()
    `
}
