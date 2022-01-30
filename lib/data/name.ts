import { GAME_NAME_FILE_NAME, pathForCurrentGame } from "../constants"

import * as fs from 'fs'

const path = pathForCurrentGame(GAME_NAME_FILE_NAME)

export const read = () : string => {
    return fs.readFileSync(path, 'utf-8')
}

export const write = (name : string) => {
    fs.writeFileSync(path, name)
}
