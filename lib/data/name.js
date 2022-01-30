import { GAME_NAME_FILE_NAME, pathForCurrentGame } from "../constants"


const path = pathForCurrentGame(GAME_NAME_FILE_NAME)

export const read = () => {
    return fs.readFileSync(path, 'utf-8')
}

export const write = (name) => {
    fs.writeFileSync(path, name)
}
