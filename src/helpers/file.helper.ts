/* ------------------------------ Dependencies ------------------------------ */
import * as fs from 'node:fs'
import * as path from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
/* ----------------------------- Custom Modules ----------------------------- */
import { FileNames, LogTypes } from '../libraries'
import { logger } from './logger.helper'
import { getModuleFolderPath } from '.'
/* -------------------------------------------------------------------------- */

export const checkFolderExistence = (moduleName: string): boolean => {
    const modulePascalCase = pascalCase(moduleName)
    return fs.existsSync(path.resolve(process.cwd(), `src/modules/${modulePascalCase}`))
}

export const createModuleFolder = (moduleName: string): boolean => {
    const modulePath = getModuleFolderPath(moduleName)
    try {
        fs.mkdirSync(modulePath, { recursive: true })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const rollback = (moduleName: string) => {
    logger(`[rollback]: Can not create ${moduleName} module.`, LogTypes.ERROR)
    const modulePath = getModuleFolderPath(moduleName)
    fs.rmSync(modulePath, { recursive: true, force: true })
}

export const getFileName = (moduleName: string, fileName: FileNames): string => {
    const moduleCamelCaseName = camelCase(moduleName)
    const filePaths = {
        [FileNames.ROUTES]: `${moduleCamelCaseName}.routes.ts`,
        [FileNames.CONTROLLER]: `${moduleCamelCaseName}.controller.ts`,
        [FileNames.SCHEMA]: `validation/schema.ts`,
        [FileNames.SERVICE]: `${moduleCamelCaseName}.service.ts`,
        [FileNames.REPOSITORY]: `${moduleCamelCaseName}.repository.ts`,
        [FileNames.QUERY]: `${moduleCamelCaseName}.query.ts`,
        [FileNames.REST]: `_rest.http`,
        [FileNames.MODULE]: '',
    }

    return filePaths[fileName]
}
