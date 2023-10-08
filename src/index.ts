/* ------------------------------ Dependencies ------------------------------ */
import { Command } from 'commander'
import { pascalCase, camelCase } from 'change-case-all'
/* ----------------------------- Custom Modules ----------------------------- */
import { IOptions } from './libraries/interface'
import { createModuleFolder } from './helpers'
/* -------------------------------- Constants ------------------------------- */
const program = new Command()
/* -------------------------------------------------------------------------- */

/* --------------------------- Generate Controller -------------------------- */
program
    .name('Generate')
    .description('Generate command help to create file')
    .command('generate')
    .option('--routes', 'Create route file.')
    .option('--controller', 'Create controller file.')
    .option('--schema', 'Create schema file.')
    .option('--service', 'Create service file.')
    .option('--repository', 'Create repository file.')
    .option('--rest', 'Create rest client files.')
    .option('--module', 'Create all files.')
    .argument('moduleName', 'Name for file eq: user -> User<Controller, Service, Repository>')
    .action((moduleName: string, options: IOptions) => {
        moduleName = `${pascalCase(moduleName)}Controller`

        // TODO : Check module existence

        // Add arguments into program.opts()
        if (options.module) {
            Object.assign(options, { controller: true, service: true, repository: true })
            for (const key of Object.keys(options)) {
                // TODO : Create module with all files
                console.log(1, { key })
            }
        } else {
            for (const key of Object.keys(options)) {
                // TODO : Create controller (and/or) service (and/or) repository from key
                // I have to create a function that give `moduleName` and `key` and depends on key i have to create file(s) (controller, service, repository)
                console.log(2, { key })
            }
        }

        console.log({ moduleName, options })
    })
/* -------------------------------------------------------------------------- */

program.parse()
// const options = program.opts()
// console.log({ options })

createModuleFolder('kara')
