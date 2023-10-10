"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogTypes = exports.FileNames = void 0;
var FileNames;
(function (FileNames) {
    FileNames["ROUTES"] = "routes";
    FileNames["CONTROLLER"] = "controller";
    FileNames["SCHEMA"] = "schema";
    FileNames["SERVICE"] = "service";
    FileNames["REPOSITORY"] = "repository";
    FileNames["QUERY"] = "query";
    FileNames["MODULE"] = "module";
    FileNames["REST"] = "rest";
})(FileNames = exports.FileNames || (exports.FileNames = {}));
var LogTypes;
(function (LogTypes) {
    LogTypes[LogTypes["VERBOSE"] = 0] = "VERBOSE";
    LogTypes[LogTypes["SUCCESS"] = 1] = "SUCCESS";
    LogTypes[LogTypes["WARNING"] = 2] = "WARNING";
    LogTypes[LogTypes["DEBUG"] = 3] = "DEBUG";
    LogTypes[LogTypes["ERROR"] = 4] = "ERROR";
    LogTypes[LogTypes["LOVE"] = 5] = "LOVE";
})(LogTypes = exports.LogTypes || (exports.LogTypes = {}));
