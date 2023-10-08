/* ------------------------------ Node Modules ------------------------------ */
import fs from 'node:fs'
import path from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import caseAnything from 'case-anything'
/* -------------------------------------------------------------------------- */

export const checkFolderExistence = (moduleName: string): boolean => {
    const pascalCase = caseAnything.pascalCase(moduleName)
    return fs.existsSync(path.resolve(process.cwd(), `src/modules/${pascalCase}`))
}

export const createModuleFolder = (moduleName: string): boolean => {
    const pascalCase = caseAnything.pascalCase(moduleName)
    try {
        fs.mkdirSync(path.resolve(process.cwd(), `src/modules/${pascalCase}`), { recursive: true })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
