"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* ------------------------------ Dependencies ------------------------------ */
const commander_1 = require("commander");
const generators_1 = require("./generators");
const helpers_1 = require("./helpers");
/* -------------------------------- Constants ------------------------------- */
const program = new commander_1.Command();
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
    .action((moduleName, options) => {
    // Check module folder existence and create it if not exist
    const isFolderExist = (0, helpers_1.checkFolderExistence)(moduleName);
    if (!isFolderExist)
        (0, helpers_1.createModuleFolder)(moduleName);
    if (options.module)
        (0, generators_1.createModule)(moduleName);
    else {
        const fileCreator = {
            routes: generators_1.createRoutes,
            controller: generators_1.createController,
            schema: generators_1.createSchema,
            service: generators_1.createService,
            repository: generators_1.createRepository,
            rest: generators_1.createRestClient,
        };
        // Convert option names to lowercase
        const lowercaseOptions = Object.keys(options).map((opt) => opt.toLowerCase());
        for (const opt of lowercaseOptions) {
            fileCreator[opt](moduleName);
        }
    }
});
/* -------------------------------------------------------------------------- */
program.parse(process.argv);
