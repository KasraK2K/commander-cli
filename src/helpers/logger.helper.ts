/* ------------------------------ Dependencies ------------------------------ */
import chalk from 'chalk'
import winston from 'winston'
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
        [LogTypes.LOVE]: chalk.hex('#f6009b'),
    }

    const winstonLog = winston.createLogger({
        format: winston.format.simple(),
        transports: [new winston.transports.Console()],
    })

    winstonLog.info(logMode[type](message))
}
