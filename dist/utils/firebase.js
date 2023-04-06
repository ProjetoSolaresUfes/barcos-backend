"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFileToStorage = void 0;
const admin = __importStar(require("firebase-admin"));
// Configuração do Firebase Admin SDK para acesso ao Storage
const dataProcessing_1 = require("./dataProcessing");
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: (_a = process.env.PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n')
    }),
    storageBucket: process.env.STORAGE_BUCKET
});
// Função que converte um array de strings em um arquivo txt e salva no Storage
function saveFileToStorage(stringsArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucket = admin.storage().bucket();
        // Convert the string array to a single string
        const text = stringsArray.join("\n");
        // Create a reference to the file in Firebase Storage
        const file = bucket.file(`logs/${(0, dataProcessing_1.getDataAtualBrasil)().format('DD-MM-YYYY HH:mm:ss')}.txt`);
        // Upload the file to Firebase Storage
        file.save(text, {
            metadata: {
                contentType: "text/plain"
            }
        }, function (error) {
            if (error) {
                console.error("Error uploading file:", error);
            }
            else {
                console.log("File uploaded successfully.");
            }
        });
    });
}
exports.saveFileToStorage = saveFileToStorage;
