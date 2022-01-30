import  * as fs from "fs";
import { MAIN_README_ASSET_PATH, pathForCurrentGame, README_ASSET_PATH, README_FILE_NAME } from "../constants";
import { Matrix } from "../data/matrix";
import { Move } from "../data/moves";
import { Game, getCoords, nextTurnSymbol } from "../game";


const getTemplate = () : string => {
    return fs.readFileSync(README_ASSET_PATH, 'utf-8')
}
const getMainTemplate = () : string => {
    return fs.readFileSync(MAIN_README_ASSET_PATH, 'utf-8')
}

const writeReadme = (path, data : string) => {
    return fs.writeFileSync(path, data)
}

const getUsers = (moves : Move[]) : Map<string, string[]> => {
    let output = new Map<string, string[]>()
    output["x"] = []
    output["o"] = []
    moves.forEach(move => {
        if(output[move.symbol].indexOf(move.user) == -1) {
            output[move.symbol].push(move.user)
        }
    })
    return output
}

const generateUsersLine = (users : string[]) : string => {
    const newUsers = users || []
    if(newUsers.length == 0) return "No users"
    return newUsers.map(user => `[${user}](https://github.com/${user})`).join(", ")
}
const generateGameStatusLine = (ended : boolean, winningSymbol : string | null) : string => {
    if(ended === true) {
        switch(winningSymbol) {
            case 'x': return "Team ❌  WON! Congrats!"
            case 'o': return "Team ⭕️  WON! Congrats!"
            default: return "The game has ended in a tie!"
        }
    } else {
        return "Game is currently in progress. Who will win?"
    }
}
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
`
const instructions = (matrix : Matrix) : string => {
    return [...Array(9).keys()]
        .map(i => i + 1)
        .reduce((acc : string, i : number) => {
            const coords = getCoords(i)
            const value = matrix[coords.x][coords.y]
            return acc.replace(`$${i}`, value == "" ? `${i}` : value)
        }, _instructions)
}

const buildPlayNow = (matrix : Matrix, nextSymbol : string | null) : string => {
    if(nextSymbol) {
        const issueTitle = encodeURIComponent(`${nextSymbol} $`)
        const issueBody = encodeURIComponent(instructions(matrix))
        return `To execute the next move, click [here](https://github.com/donadev/TicTacToe/issues/new?title=${issueTitle}&body=${issueBody})`
    } else {
        return "The game is ended, cannot play another move."
    }
}

const generate = (game : Game, nextSymbol : string | null) : string => {
    const folder = game.ended ? game.name : "current"
    const users = getUsers(game.moves)
    const prettyDate = new Date(game.name).toLocaleString()
    return getTemplate()
        .replace("$GAME_NAME", folder)
        .replace("$DATE", prettyDate)
        .replace("$PLAY_NOW", buildPlayNow(game.matrix, nextSymbol))
        .replace("$TEAM_O", generateUsersLine(users["o"]))
        .replace("$TEAM_X", generateUsersLine(users["x"]))
        .replace("$GAME_STATUS", generateGameStatusLine(game.ended, game.winningSymbol))
}

export const refreshReadme = (game : Game, nextSymbol : string | null, path : string) : string => {
    const readme = generate(game, nextSymbol)
    writeReadme(path, readme)
    return readme
}

const getPastGameList = () : string[] => {
    const files = fs.readdirSync("./games").filter(dir => dir != "." && dir != "current")
    return files
}
const getPastGameText = (games : string[]) : string => {
    return games
    .map((isoDate, index) => [new Date(isoDate).toLocaleString(), index + 1, isoDate])
    .map(([prettyDate, number, folder]) => `- [Game #${number} (${prettyDate})](https://github.com/donadev/TicTacToe/blob/main/games/${folder})`)
    .reverse()
    .join("\n")
}

export const embedReadme = (readme: string) : string => {
    const pastGames = getPastGameList()
    const pastGamesText = getPastGameText(pastGames)
    return getMainTemplate()
        .replace("$README", readme)
        .replace("$PAST_GAMES", pastGamesText)
}
