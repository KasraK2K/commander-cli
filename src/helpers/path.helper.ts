/* ------------------------------ Node Modules ------------------------------ */
import * as path from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase } from 'change-case-all'
/* ----------------------------- Custom Modules ----------------------------- */
import { FileNames } from '../libraries'
import { getFileName } from '.'
/* -------------------------------------------------------------------------- */

export const getModuleFolderPath = (moduleName: string): string => {
    const modulePascalCase = pascalCase(moduleName)
    return path.resolve(process.cwd(), `src/modules/${modulePascalCase}`)
}

export const getFilePath = (moduleName: string, fileName: FileNames): string => {
    const modulePascalCase = pascalCase(moduleName)
    const finalPath =
        fileName === FileNames.MODULE
            ? ''
            : path.resolve(
                  process.cwd(),
                  `src/modules/${modulePascalCase}/${getFileName(moduleName, fileName)}`,
              )

    return finalPath
}
