"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cron = void 0;
const cron_1 = require("cron");
const types_1 = require("../../utils/types");
const helloWorld_1 = require("../commands/helloWorld");
//IMPORT CRON HERE
class cron {
    static setup() {
        return __awaiter(this, void 0, void 0, function* () {
            new cron_1.CronJob(types_1.CronEnums.EVERY_30_MINUTES, helloWorld_1.helloWorld).start();
            //ADD CRON JOBS HERE
        });
    }
}
exports.cron = cron;
