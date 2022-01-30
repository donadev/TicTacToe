import { MATRIX_FILE_NAME, pathForCurrentGame } from "../constants"

import * as fs from 'fs'

const path = pathForCurrentGame(MATRIX_FILE_NAME)


export type Matrix = string[][]

export const read = () : Matrix => {
    const file = fs.readFileSync(path, 'utf8')
    return file.split("\n").map(s => Array.from(s))

}

export const write = (matrix : Matrix) => {
    const lines = matrix.map(arr => arr.join(""))
    const data = lines.join("\n")
    fs.writeFileSync(path, data, 'utf8')
}