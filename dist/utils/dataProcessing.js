"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertData = exports.getDataAtualBrasil = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function getDataAtualBrasil() {
    const dataAtual = (0, moment_timezone_1.default)().tz('America/Sao_Paulo');
    return dataAtual;
}
exports.getDataAtualBrasil = getDataAtualBrasil;
function convertData(str) {
    let array = str.split(",");
    return {
        correnteMotor: array[0],
        correnteBaterias: array[1],
        temperatura: array[2],
        umidade: array[3],
        tensaoAlimentacaoPCB: array[4],
        estadoStringSolar1: array[5],
        estadoStringSolar2: array[6],
        tensaoSaidaMPPT: array[7],
        tensaoEntradaMPPT: array[8],
        correnteMPPT: array[9],
        updateAt: getDataAtualBrasil().format('DD/MM/YYYY HH:mm:ss')
    };
}
exports.convertData = convertData;
