"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./lib/game");
const move_1 = require("./lib/move");
const initGame = async () => {
    await (0, game_1.newGame)();
    await (0, move_1.execute)({ user: "donadev", symbol: "x", index: 1 });
    await (0, move_1.execute)({ user: "evildev", symbol: "o", index: 4 });
    await (0, move_1.execute)({ user: "donadev", symbol: "x", index: 2 });
    await (0, move_1.execute)({ user: "evildev", symbol: "o", index: 5 });
    await (0, move_1.execute)({ user: "donadev", symbol: "x", index: 3 });
};
initGame().then(console.log).catch(console.error);
//# sourceMappingURL=index.js.map