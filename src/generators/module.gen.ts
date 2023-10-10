/* ----------------------------- Custom Modules ----------------------------- */
import {
    createRoutes,
    createController,
    createSchema,
    createService,
    createRepository,
    createRestClient,
} from '.'
import { rollback } from '../helpers'
/* -------------------------------------------------------------------------- */

export const createModule = (moduleName: string): void => {
    let error = false

    // TODO : Create all files
    if (!createController(moduleName)) error = true
    if (!createSchema(moduleName)) error = true
    if (!createService(moduleName)) error = true
    if (!createRepository(moduleName)) error = true
    if (!createRestClient(moduleName)) error = true
    if (!createRoutes(moduleName)) error = true

    if (error) rollback(moduleName)
}
