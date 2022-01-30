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
exports.execute = void 0;
const matrixRepo = __importStar(require("./data/matrix"));
const movesRepo = __importStar(require("./data/moves"));
const game_1 = require("./game");
const reload_1 = require("./reload");
const canExecute = (move, game) => {
    //non posso inserire un simbolo diverso da x|o
    if (!(move.symbol == "x") && !(move.symbol == "o"))
        return Error("Non puoi inserire un simbolo diverso da x oppure o");
    const coords = (0, game_1.getCoords)(move.index), x = coords.x, y = coords.y;
    console.log("Coordinates", coords);
    const place = game.matrix[x][y];
    //non posso inserire dove il campo è occupato
    if (place == "x" || place == "o")
        return Error("Non puoi inserire in questa posizione, il campo è già occupato");
    //non posso inserire se non è il mio turno
    if (game.moves.length > 0 && (0, game_1.nextTurnSymbol)(game.moves) != move.symbol)
        return Error("Non è il tuo turno!");
    return null;
};
const execute = async (move) => {
    const game = (0, game_1.get)();
    console.log("Move", move);
    console.log("Game", game);
    const error = canExecute(move, game);
    if (error) {
        throw error;
    }
    else {
        console.log("Execution authorized");
        const coords = (0, game_1.getCoords)(move.index), x = coords.x, y = coords.y;
        game.matrix[x][y] = move.symbol;
        matrixRepo.write(game.matrix);
        game.moves.push(move);
        movesRepo.write(game.moves);
        if ((0, game_1.checkWin)(game.matrix) || (0, game_1.checkTie)(game.matrix)) {
            await (0, game_1.endCurrentGame)(game);
        }
        else {
            await (0, reload_1.reloadCurrentGame)(game, (0, game_1.nextTurnSymbol)(game.moves));
        }
    }
};
exports.execute = execute;
var args = process.argv.slice(2);
const user = args[0];
const symbol = args[1];
const index = parseInt(args[2]);
const move = { user, symbol, index };
(0, exports.execute)(move).then(console.log).catch(console.error);
//# sourceMappingURL=move.js.map