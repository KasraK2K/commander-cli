"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
/* ----------------------------- Custom Modules ----------------------------- */
const _1 = require(".");
const helpers_1 = require("../helpers");
/* -------------------------------------------------------------------------- */
const createModule = (moduleName) => {
    let error = false;
    // TODO : Create all files
    if (!(0, _1.createController)(moduleName))
        error = true;
    if (!(0, _1.createSchema)(moduleName))
        error = true;
    if (!(0, _1.createService)(moduleName))
        error = true;
    if (!(0, _1.createRepository)(moduleName))
        error = true;
    if (!(0, _1.createRestClient)(moduleName))
        error = true;
    if (!(0, _1.createRoutes)(moduleName))
        error = true;
    if (error)
        (0, helpers_1.rollback)(moduleName);
};
exports.createModule = createModule;
