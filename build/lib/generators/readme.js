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
exports.embedReadme = exports.refreshReadme = void 0;
const fs = __importStar(require("fs"));
const constants_1 = require("../constants");
const game_1 = require("../game");
const getTemplate = () => {
    return fs.readFileSync(constants_1.README_ASSET_PATH, 'utf-8');
};
const getMainTemplate = () => {
    return fs.readFileSync(constants_1.MAIN_README_ASSET_PATH, 'utf-8');
};
const writeReadme = (path, data) => {
    return fs.writeFileSync(path, data);
};
const getUsers = (moves) => {
    let output = new Map();
    output["x"] = [];
    output["o"] = [];
    moves.forEach(move => {
        if (output[move.symbol].indexOf(move.user) == -1) {
            output[move.symbol].push(move.user);
        }
    });
    return output;
};
const generateUsersLine = (users) => {
    const newUsers = users || [];
    if (newUsers.length == 0)
        return "No users";
    return newUsers.map(user => `[${user}](https://github.com/${user})`).join(", ");
};
const generateGameStatusLine = (ended, winningSymbol) => {
    if (ended === true) {
        switch (winningSymbol) {
            case 'x': return "Team ❌  WON! Congrats!";
            case 'o': return "Team ⭕️  WON! Congrats!";
            default: return "The game has ended in a tie!";
        }
    }
    else {
        return "Game is currently in progress. Who will win?";
    }
};
const _instructions = `
### Instructions

Please replace in the title the char "$" with the index of your move, following the schema:

| $1 | $2 | $3  |
| :-: | :-: | :-: |
| $4 | $5 | $6 |
| $7 | $8 | $9 |

### Rules
- if you break the game rules, the move will not be applied.
- If the move is authorized, it will display with your name on the readme in approx 20 seconds.
`;
const instructions = (matrix) => {
    return [...Array(9).keys()]
        .map(i => i + 1)
        .reduce((acc, i) => {
        const coords = (0, game_1.getCoords)(i);
        const value = matrix[coords.x][coords.y];
        return acc.replace(`$${i}`, value.trim() == "" ? `${i}` : value);
    }, _instructions);
};
const buildPlayNow = (matrix, nextSymbol) => {
    if (nextSymbol) {
        const issueTitle = encodeURIComponent(`${nextSymbol} $`);
        const issueBody = encodeURIComponent(instructions(matrix));
        return `To execute the next move, click [here](https://github.com/donadev/TicTacToe/issues/new?title=${issueTitle}&body=${issueBody})`;
    }
    else {
        return "The game is ended, cannot play another move.";
    }
};
const generate = (game, imageName, nextSymbol) => {
    const folder = game.ended ? game.name : "current";
    const users = getUsers(game.moves);
    const prettyDate = new Date(game.name).toLocaleString();
    return getTemplate()
        .replace("$GAME_NAME", folder)
        .replace("$TIMESTAMP", `${imageName}`)
        .replace("$DATE", prettyDate)
        .replace("$PLAY_NOW", buildPlayNow(game.matrix, nextSymbol))
        .replace("$TEAM_O", generateUsersLine(users["o"]))
        .replace("$TEAM_X", generateUsersLine(users["x"]))
        .replace("$GAME_STATUS", generateGameStatusLine(game.ended, game.winningSymbol));
};
const refreshReadme = (game, nextSymbol, imageName, path) => {
    const readme = generate(game, imageName, nextSymbol);
    writeReadme(path, readme);
    return readme;
};
exports.refreshReadme = refreshReadme;
const getPastGameList = () => {
    const files = fs.readdirSync("./games").filter(dir => dir != "." && dir != "current");
    return files;
};
const getPastGameText = (games) => {
    return games
        .map((isoDate, index) => [new Date(isoDate).toLocaleString(), index + 1, isoDate])
        .map(([prettyDate, number, folder]) => `- [Game #${number} (${prettyDate})](https://github.com/donadev/TicTacToe/blob/main/games/${folder})`)
        .reverse()
        .join("\n");
};
const embedReadme = (readme) => {
    const pastGames = getPastGameList();
    const pastGamesText = getPastGameText(pastGames);
    return getMainTemplate()
        .replace("$README", readme)
        .replace("$PAST_GAMES", pastGamesText);
};
exports.embedReadme = embedReadme;
//# sourceMappingURL=readme.js.map