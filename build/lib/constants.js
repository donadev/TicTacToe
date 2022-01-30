"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathForCurrentGame = exports.pathForGame = exports.README_PATH = exports.OUTPUT_IMAGE_NAME = exports.README_FILE_NAME = exports.GAME_NAME_FILE_NAME = exports.MATRIX_FILE_NAME = exports.MOVES_FILE_NAME = exports.MAIN_README_ASSET_PATH = exports.README_ASSET_PATH = exports.FIELD_ASSET_PATH = void 0;
exports.FIELD_ASSET_PATH = "./assets/field.png";
exports.README_ASSET_PATH = "./assets/readme_template.txt";
exports.MAIN_README_ASSET_PATH = "./assets/main_readme_template.txt";
exports.MOVES_FILE_NAME = "moves.txt";
exports.MATRIX_FILE_NAME = "matrix.txt";
exports.GAME_NAME_FILE_NAME = "name.txt";
exports.README_FILE_NAME = "README.md";
exports.OUTPUT_IMAGE_NAME = "output.png";
exports.README_PATH = `./${exports.README_FILE_NAME}`;
const pathForGame = (gameName, fileName) => {
    return `./games/${gameName}/${fileName}`;
};
exports.pathForGame = pathForGame;
const pathForCurrentGame = (fileName) => {
    return (0, exports.pathForGame)("current", fileName);
};
exports.pathForCurrentGame = pathForCurrentGame;
//# sourceMappingURL=constants.js.map