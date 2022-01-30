import { MATRIX_FILE_NAME, pathForCurrentGame } from "../constants"

import * as fs from 'fs'

const path = pathForCurrentGame(MATRIX_FILE_NAME)


export type Matrix = string[][]

const pad = (matrix : Matrix) : Matrix => {
    while(matrix.length < 3) {
        matrix.push(['', '', ''])
    }
    for(var row of matrix) {
        while(row.length < 3) {
            row.push('')
        }
    }
    return matrix
}

export const read = () : Matrix => {
    const file = fs.readFileSync(path, 'utf8')
    const output = file.split("\n").map(s => Array.from(s))
    return pad(output)
}

export const write = (matrix : Matrix) => {
    const lines = matrix.map(arr => arr.join(""))
    const data = lines.join("\n")
    fs.writeFileSync(path, data, 'utf8')
}