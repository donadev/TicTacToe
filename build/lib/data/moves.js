"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = void 0;
const constants_1 = require("../constants");
const fs = __importStar(require("fs"));
const path = (0, constants_1.pathForCurrentGame)(constants_1.MOVES_FILE_NAME);
const read = () => {
    const file = fs.readFileSync(path, 'utf8');
    if (file == "")
        return [];
    return file.split("\n").map(line => {
        const values = line.split(",");
        return { user: values[0], symbol: values[1], index: parseInt(values[2]) };
    });
};
exports.read = read;
const write = (moves) => {
    const lines = moves.map(move => `${move.user},${move.symbol},${move.index}`);
    const data = lines.join("\n");
    fs.writeFileSync(path, data, 'utf8');
};
exports.write = write;
//# sourceMappingURL=moves.js.map