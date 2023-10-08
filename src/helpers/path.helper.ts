/* ------------------------------ Node Modules ------------------------------ */
import path from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { pascalCase } from 'change-case-all'
import { FileNames } from '../libraries/enums'
/* -------------------------------------------------------------------------- */

export const getFilePath = (moduleName: string, fileName: FileNames): string => {
    const modulePascalCase = pascalCase(moduleName)

    const finalPath =
        fileName === 'schema'
            ? path.resolve(
                  process.cwd(),
                  `src/modules/${modulePascalCase}/validation/${fileName}.ts`
              )
            : path.resolve(process.cwd(), `src/modules/${modulePascalCase}/${fileName}.ts`)

    return finalPath
}
