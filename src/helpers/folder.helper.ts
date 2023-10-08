/* ------------------------------ Node Modules ------------------------------ */
import fs from 'node:fs'
import path from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase, camelCase } from 'change-case-all'
/* -------------------------------------------------------------------------- */

export const checkFolderExistence = (moduleName: string): boolean => {
    pascalCase(moduleName)
    return fs.existsSync(path.resolve(process.cwd(), `src/modules/${pascalCase}`))
}

export const createModuleFolder = (moduleName: string): boolean => {
    pascalCase(moduleName)
    try {
        fs.mkdirSync(path.resolve(process.cwd(), `src/modules/${pascalCase}`), { recursive: true })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
