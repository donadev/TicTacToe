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
exports.reloadCurrentGame = void 0;
const image_1 = require("./generators/image");
const readme_1 = require("./generators/readme");
const fs = __importStar(require("fs"));
const constants_1 = require("./constants");
const readme_2 = require("./generators/readme");
const reloadCurrentGame = async (game, nextSymbol) => {
    console.log("reloadCurrentGame", game);
    const outputImagePath = (0, constants_1.pathForCurrentGame)(constants_1.OUTPUT_IMAGE_NAME);
    const imageName = `${new Date().getTime()}`;
    const freshImagePath = (0, constants_1.pathForCurrentGame)(`cachebypass/${imageName}.png`);
    const outputReadme = (0, constants_1.pathForCurrentGame)(constants_1.README_FILE_NAME);
    await (0, image_1.refreshImage)(game.matrix, outputImagePath, freshImagePath);
    const content = (0, readme_1.refreshReadme)(game, nextSymbol, imageName, outputReadme);
    propagateReadme(content);
};
exports.reloadCurrentGame = reloadCurrentGame;
const propagateReadme = (content) => {
    const embedded = (0, readme_2.embedReadme)(content);
    fs.writeFileSync(constants_1.README_PATH, embedded);
};
//# sourceMappingURL=reload.js.map