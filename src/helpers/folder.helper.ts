/* ------------------------------ Node Modules ------------------------------ */
import fs from 'node:fs'
import path from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase } from 'change-case-all'
/* -------------------------------------------------------------------------- */

export const checkFolderExistence = (moduleName: string): boolean => {
    const modulePascalCase = pascalCase(moduleName)
    return fs.existsSync(path.resolve(process.cwd(), `src/modules/${modulePascalCase}`))
}

export const createModuleFolder = (moduleName: string): boolean => {
    const modulePascalCase = pascalCase(moduleName)
    try {
        fs.mkdirSync(path.resolve(process.cwd(), `src/modules/${modulePascalCase}`), {
            recursive: true
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
