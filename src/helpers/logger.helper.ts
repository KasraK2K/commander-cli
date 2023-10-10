/* ------------------------------ Dependencies ------------------------------ */
import chalk from 'chalk'
/* ----------------------------- Custom Modules ----------------------------- */
import { LogTypes } from '../libraries'
/* -------------------------------------------------------------------------- */

export const logger = (message: string, type: LogTypes): void => {
    const logMode = {
        [LogTypes.VERBOSE]: chalk.white,
        [LogTypes.SUCCESS]: chalk.green,
        [LogTypes.WARNING]: chalk.rgb(255, 255, 0),
        [LogTypes.DEBUG]: chalk.rgb(0, 0, 255),
        [LogTypes.ERROR]: chalk.red,
    }

    console.log(logMode[type](message))
}