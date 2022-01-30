import { MOVES_FILE_NAME, pathForCurrentGame } from "../constants"

import * as fs from 'fs'

const path = pathForCurrentGame(MOVES_FILE_NAME)

export type Move = {user : string, symbol : string, index : number}

export const read = () : Move[] => {
    const file = fs.readFileSync(path, 'utf8')
    return file.split("\n").map(line => {
        const values = line.split(",")
        return {user: values[0], symbol: values[1], index: parseInt(values[2])}
    })
}

export const write = (moves : Move[]) => {
    const lines = moves.map(move => `${move.user},${move.symbol},${move.index}`)
    const data = lines.join("\n")
    fs.writeFileSync(path, data, 'utf8')
}