/* ------------------------------ Dependencies ------------------------------ */
import { Command } from 'commander'
import caseAnything from 'case-anything'
/* ----------------------------- Custom Modules ----------------------------- */
import { IOptions } from './libraries/interface'
/* -------------------------------- Constants ------------------------------- */
const program = new Command()
/* -------------------------------------------------------------------------- */

/* --------------------------- Generate Controller -------------------------- */
program
    .name('Generate')
    .description('Generate command help to create file')
    .command('generate')
    .option('-c, --controller', 'Create controller file.')
    .option('-s, --service', 'Create service file.')
    .option('-r, --repository', 'Create repository file.')
    .option('-m, --module', 'Create all files.')
    .argument('name', 'Name for file eq: user -> User<Controller, Service, Repository>')
    .action((name: string, options: IOptions) => {
        name = `${caseAnything.pascalCase(name)}Controller`

        // TODO : Check module existence

        // Add arguments into program.opts()
        if (options.module) {
            Object.assign(options, { controller: true, service: true, repository: true })
            for (const key of Object.keys(options)) {
                // TODO : Create module with all files
            }
        } else {
            for (const key of Object.keys(options)) {
                // TODO : Create controller (and/or) service (and/or) repository from key
                // I have to create a function that give `name` and `key` and depends on key i have to create file(s) (controller, service, repository)
            }
        }

        console.log({ name, options })
    })
/* -------------------------------------------------------------------------- */

program.parse()
// const options = program.opts()
// console.log({ options })
