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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshImage = void 0;
const fs = __importStar(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const constants_1 = require("../constants");
const imageFor = (row, column, symbol) => {
    const id = row * 3 + column + 1;
    return `assets/${symbol}/${id}.png`;
};
const overlap = async (images) => {
    return await (0, sharp_1.default)(constants_1.FIELD_ASSET_PATH)
        .composite(images.map(image => {
        return { input: image };
    }))
        .toBuffer();
};
const getImages = (matrix) => {
    const images = [];
    for (const row in matrix) {
        for (const column in matrix[row]) {
            const i = parseInt(row), j = parseInt(column);
            const symbol = matrix[i][j];
            if (symbol == "o" || symbol == "x") {
                images.push(imageFor(i, j, symbol));
            }
        }
    }
    return images;
};
const refreshImage = async (matrix, outputPath, freshFilePath) => {
    const images = getImages(matrix);
    const buffer = await overlap(images);
    console.log("Rendering images", outputPath, freshFilePath);
    fs.writeFileSync(outputPath, buffer);
    fs.writeFileSync(freshFilePath, buffer);
};
exports.refreshImage = refreshImage;
//# sourceMappingURL=image.js.map