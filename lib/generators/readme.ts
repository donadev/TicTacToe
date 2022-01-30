import  * as fs from "fs";
import { MAIN_README_ASSET_PATH, pathForCurrentGame, README_ASSET_PATH, README_FILE_NAME } from "../constants";
import { Matrix } from "../data/matrix";
import { Move } from "../data/moves";


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
    moves.forEach(move => {
        let array = output[move.symbol]
        array = array || []
        if(array.find(move.user) == null) {
            array.push(move.user)
        }
    })
    return output
}

const generateUsersLine = (users : string[]) : string => {
    return (users || []).map(user => `[${user}](https://github.com/${user})`).join(", ")
}
const generateGameStatusLine = (ended : boolean, winningSymbol : string | null) : string => {
    if(ended) {
        switch(winningSymbol) {
            case 'x': "Team ❌ WON! Congrats!"
            case 'o': "Team ⭕️ WON! Congrats!"
            default: "The game has ended in a tie!"
        }
    } else {
        return "Game is currently in progress. Who will win?"
    }
}

const generate = (moves : Move[], date : string, ended : boolean, winningSymbol : string | null) : string => {
    const folder = ended ? date : "current"
    const users = getUsers(moves)
    const prettyDate = new Date(date).toLocaleString()
    return getTemplate()
        .replace("$GAME_NAME", folder)
        .replace("$DATE", prettyDate)
        .replace("$TEAM_O", generateUsersLine(users["o"]))
        .replace("$TEAM_X", generateUsersLine(users["x"]))
        .replace("$GAME_STATUS", generateGameStatusLine(ended, winningSymbol))
}

export const refreshReadme = (moves : Move[], date : string, ended : boolean, winningSymbol : string | null, path : string) => {
    const readme = generate(moves, date, ended, winningSymbol)
    writeReadme(path, readme)
}

const getPastGameList = () : string[] => {
    const files = fs.readdirSync("./games").filter(dir => dir != "." && dir != "current")
    return files
}
const getPastGameText = (games : string[]) : string => {
    return games.map(game => `- [${game}](https://github.com/donadev/TicTacToe/blob/main/games/${game})`).join("\n")
}

export const embedReadme = (readme: string) => {
    const pastGames = getPastGameList()
    const pastGamesText = getPastGameText(pastGames)
    return getMainTemplate()
        .replace("$README", readme)
        .replace("$PAST_GAMES", pastGamesText)
}
