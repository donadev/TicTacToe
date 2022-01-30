import  * as fs from "fs";
import { pathForCurrentGame, README_ASSET_PATH, README_FILE_NAME } from "../constants";
import { Matrix } from "../data/matrix";
import { Move } from "../data/moves";


const getTemplate = () : string => {
    return fs.readFileSync(README_ASSET_PATH, 'utf-8')
}

const writeReadme = (path, data : string) => {
    return fs.writeFileSync(path, data)
}

const getUsers = (moves : Move[]) : Map<String, String> => {
    let output = new Map<string, string>()
    moves.forEach(move => {
        output[move.symbol] = move.user
    })
    return output
}

const generateUsersLine = (users : string[]) : string => {
    return users.map(user => `[${user}](https://github.com/${user})`).join(", ")
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
    const gameName = ended ? date : "current"
    const users = getUsers(moves)
    return getTemplate()
        .replace("$GAME_NAME", gameName)
        .replace("$DATE", date)
        .replace("$TEAM_O", generateUsersLine(users["o"]))
        .replace("$TEAM_X", generateUsersLine(users["x"]))
        .replace("$GAME_STATUS", generateGameStatusLine(ended, winningSymbol))
}

export const refreshReadme = (moves : Move[], date : string, ended : boolean, winningSymbol : string | null, path : string) => {
    const readme = generate(moves, date, ended, winningSymbol)
    writeReadme(path, readme)
}
