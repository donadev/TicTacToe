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
exports.get = exports.checkTie = exports.checkWin = exports.checkWinSymbol = exports.winningSymbol = exports.getCoords = exports.newGame = exports.nextTurnSymbol = exports.endCurrentGame = void 0;
const nameRepo = __importStar(require("./data/name"));
const matrixRepo = __importStar(require("./data/matrix"));
const movesRepo = __importStar(require("./data/moves"));
const fs = __importStar(require("fs"));
const fs_extra = __importStar(require("fs-extra"));
const constants_1 = require("./constants");
const reload_1 = require("./reload");
const createEmptyFile = (path) => {
    writeFile(path, "");
};
const writeFile = (path, data) => {
    fs.writeFileSync(path, data);
};
const endCurrentGame = async (game) => {
    game.ended = true;
    game.winningSymbol = (0, exports.winningSymbol)(game.matrix);
    await (0, reload_1.reloadCurrentGame)(game, null);
    saveCurrentGame(game.name);
    (0, exports.newGame)();
};
exports.endCurrentGame = endCurrentGame;
const saveCurrentGame = (name) => {
    const src = "./games/current";
    const dest = `./games/${name}`;
    fs_extra.moveSync(src, dest);
};
const nextTurnSymbol = (moves) => {
    if (moves.length == 0)
        return null;
    return moves[moves.length - 1].symbol == "x" ? "o" : "x";
};
exports.nextTurnSymbol = nextTurnSymbol;
const newGame = async () => {
    if (!fs.existsSync("./games/current")) {
        fs.mkdirSync("./games/current/cachebypass", { recursive: true });
    }
    const game = { matrix: [["", "", ""], ["", "", ""], ["", "", ""]], moves: [], name: new Date().toISOString(), ended: false, winningSymbol: null };
    writeFile((0, constants_1.pathForCurrentGame)(constants_1.GAME_NAME_FILE_NAME), game.name);
    createEmptyFile((0, constants_1.pathForCurrentGame)(constants_1.MOVES_FILE_NAME));
    createEmptyFile((0, constants_1.pathForCurrentGame)(constants_1.MATRIX_FILE_NAME));
    await (0, reload_1.reloadCurrentGame)(game, 'x');
};
exports.newGame = newGame;
const getCoords = (i) => {
    const a = i - 1;
    return { x: Math.floor(a / 3), y: Math.floor(a % 3) };
};
exports.getCoords = getCoords;
const winningSymbol = (matrix) => {
    return ["x", "o"].find(symbol => (0, exports.checkWinSymbol)(matrix, symbol));
};
exports.winningSymbol = winningSymbol;
const checkWinSymbol = (matrix, symbol) => {
    const patterns = [
        [1, 2, 3], [3, 6, 9], [1, 4, 7], [7, 8, 9], [1, 5, 9], [3, 5, 7], [2, 4, 8], [4, 5, 6]
    ];
    for (let pattern of patterns) {
        const coords = pattern.map(exports.getCoords);
        const won = coords.every(coord => matrix[coord.x][coord.y] == symbol);
        if (won) {
            console.log(`🏆 ${symbol} symbol won!!!`);
            return true;
        }
    }
    return false;
};
exports.checkWinSymbol = checkWinSymbol;
const checkWin = (matrix) => {
    return (0, exports.checkWinSymbol)(matrix, "o") || (0, exports.checkWinSymbol)(matrix, "x");
};
exports.checkWin = checkWin;
const checkTie = (matrix) => {
    if ((0, exports.checkWin)(matrix))
        return false;
    const tie = matrix.every(row => row.every(c => c == "o" || c == "x"));
    if (tie)
        console.log("Oh no!!! It's a tie!!!!");
    return tie;
};
exports.checkTie = checkTie;
const get = () => {
    const matrix = matrixRepo.read();
    return {
        matrix: matrixRepo.read(),
        moves: movesRepo.read(),
        name: nameRepo.read(),
        ended: (0, exports.checkTie)(matrix) || (0, exports.checkWin)(matrix),
        winningSymbol: (0, exports.winningSymbol)(matrix)
    };
};
exports.get = get;
//# sourceMappingURL=game.js.map