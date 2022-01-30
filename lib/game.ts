import * as nameRepo from "./data/name";
import * as fs from "fs";
import * as fs_extra from 'fs-extra';
import { pathForCurrentGame, GAME_NAME_FILE_NAME, MOVES_FILE_NAME, MATRIX_FILE_NAME, README_PATH } from "./constants";
import { reloadCurrentGame } from "./reload";
import { Matrix } from "./data/matrix";

export type Coord = {x: number, y : number}

const createEmptyFile = (path : string) => {
    writeFile(path, "")
}
const writeFile = (path : string, data : string) => {
    fs.writeFileSync(path, data)
}
export const endCurrentGame = (matrix : Matrix) => {
    const name = nameRepo.read()
    reloadCurrentGame(true, winningSymbol(matrix))
    saveCurrentGame(name)
    newGame()
}
const saveCurrentGame = (name : string) => {
    const src = "./games/current"
    const dest = `./games/${name}`
    fs_extra.moveSync(src, dest)
}
export const newGame = () => {
    writeFile(pathForCurrentGame(GAME_NAME_FILE_NAME), new Date().toDateString())
    createEmptyFile(pathForCurrentGame(MOVES_FILE_NAME))
    createEmptyFile(pathForCurrentGame(MATRIX_FILE_NAME))
    reloadCurrentGame()
    propagateReadme(pathForCurrentGame(README_PATH))
}
function propagateReadme(readmePath : string) {
    fs.copyFileSync(readmePath, README_PATH)
}
export const getCoords = (i : number) : Coord => {
    const a = i - 1
    return {x: Math.floor(a / 3), y: Math.floor(a % 3)}
}
export const winningSymbol = (matrix : Matrix) : string | null => {
    return ["x", "o"].find(symbol => checkWinSymbol(matrix, symbol))
}
export const checkWinSymbol = (matrix : Matrix, symbol : string) : boolean => {
    const patterns = [
        [1, 2, 3], [3, 6, 9], [1, 4, 7], [7, 8, 9], [1, 5, 9], [3, 5, 7], [2, 4, 8], [4, 5, 6]
    ]
    for(let pattern of patterns) {
        const coords = pattern.map(getCoords)
        const won = coords.every(coord => matrix[coord.x][coord.y] == symbol)
        if(won) { 
            console.log(`🏆 ${symbol} symbol won!!!`)
            return true 
        }
    }
    return false
}
export const checkWin = (matrix : Matrix) : boolean => {
    return checkWinSymbol(matrix, "o") || checkWinSymbol(matrix, "x")
}
export const checkTie = (matrix : Matrix) : boolean => {
    if(checkWin(matrix)) return false
    const tie = matrix.every(row => row.every(c => c == "o" || c == "x"))
    if(tie) console.log("Oh no!!! It's a tie!!!!")
    return tie
}