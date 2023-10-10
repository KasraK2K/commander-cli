/* ---------------------------- Node Dependencies --------------------------- */
import * as fs from 'node:fs'
/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
/* ----------------------------- Custom Modules ----------------------------- */
import { getFileName, getFilePath, logger } from '../helpers'
import { FileNames, LogTypes } from '../libraries'
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

export const createController = (moduleName: string): boolean => {
    const controllerText = controllerTextGenerator(moduleName)
    const filePath = getFilePath(moduleName, FileNames.CONTROLLER)
    try {
        fs.writeFileSync(filePath, controllerText)
        logger(`${getFileName(moduleName, FileNames.CONTROLLER)}\tis created`, LogTypes.SUCCESS)
        return true
    } catch {
        return false
    }
}
