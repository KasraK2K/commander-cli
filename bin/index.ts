/* ------------------------------ Dependencies ------------------------------ */
import { Command } from 'commander'
/* ----------------------------- Custom Modules ----------------------------- */
import { IOptions } from '../src/libraries'
import {
    createController,
    createModule,
    createRepository,
    createRestClient,
    createRoutes,
    createSchema,
    createService,
} from '../src/generators'
import { checkFolderExistence, createModuleFolder } from '../src/helpers'
/* -------------------------------- Constants ------------------------------- */
const program = new Command()
/* -------------------------------------------------------------------------- */

/* --------------------------- Generate Controller -------------------------- */
program
    .name('Generate')
    .description('Generate command help to create file.')
    .command('generate')
    .option('--routes', 'Create route file.')
    .option('-c, --controller', 'Create controller file.')
    .option('--schema', 'Create schema file.')
    .option('-s, --service', 'Create service file.')
    .option('-r, --repository', 'Create repository file.')
    .option('--rest', 'Create rest client files.')
    .option('-m, --module', 'Create all files.')
    .argument('moduleName', 'Name for file eq: user -> User<Controller, Service, Repository>')
    .action((moduleName: string, options: IOptions) => {
        // Check module folder existence and create it if not exist
        const isFolderExist = checkFolderExistence(moduleName)
        if (!isFolderExist) createModuleFolder(moduleName)

        if (options.module) createModule(moduleName)
        else {
            const fileCreator: Record<string, (moduleName: string) => boolean> = {
                routes: createRoutes,
                controller: createController,
                schema: createSchema,
                service: createService,
                repository: createRepository,
                rest: createRestClient,
            }
            // Convert option names to lowercase
            const lowercaseOptions = Object.keys(options).map((opt) => opt.toLowerCase())
            for (const opt of lowercaseOptions) {
                fileCreator[opt](moduleName)
            }
        }
    })
/* -------------------------------------------------------------------------- */

program.parse(process.argv)
