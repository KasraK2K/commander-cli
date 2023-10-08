/* ------------------------------ Node Modules ------------------------------ */
import path from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import caseAnything from 'case-anything'
import { FileNames } from '../libraries/enums'
/* -------------------------------------------------------------------------- */

export const getFilePath = (moduleName: string, fileName: FileNames): string => {
    const pascalCase = caseAnything.pascalCase(moduleName)

    const finalPath =
        fileName === 'schema'
            ? path.resolve(process.cwd(), `src/modules/${pascalCase}/validation/${fileName}.ts`)
            : path.resolve(process.cwd(), `src/modules/${pascalCase}/${fileName}.ts`)

    return finalPath
}
