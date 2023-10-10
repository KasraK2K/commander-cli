/* ---------------------------- Node Dependencies --------------------------- */
import fs from 'node:fs'
/* ------------------------------ Dependencies ------------------------------ */
import { camelCase } from 'change-case-all'
/* ----------------------------- Custom Modules ----------------------------- */
import { getFileName, getFilePath, logger } from '../helpers'
import { FileNames, LogTypes } from '../libraries'
/* -------------------------------------------------------------------------- */

export const routesTextGenerator = (moduleName: string): string => {
    camelCase(moduleName)

    return `
/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const router = express.Router()
/* -------------------------------------------------------------------------- */

/* ------------------------------- Controllers ------------------------------ */
import ${camelCase}Controller from './${camelCase}.controller'
/* -------------------------------------------------------------------------- */

router.post('/health-check', ${camelCase}Controller.healthCheck)

export default router
`
}

export const createRoutes = (moduleName: string): boolean => {
    const routeText = routesTextGenerator(moduleName)
    const filePath = getFilePath(moduleName, FileNames.ROUTES)
    try {
        fs.writeFileSync(filePath, routeText)
        logger(`${getFileName(moduleName, FileNames.ROUTES)}\t\tis created`, LogTypes.SUCCESS)
        return true
    } catch {
        return false
    }
}
