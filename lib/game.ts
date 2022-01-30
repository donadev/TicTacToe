import * as nameRepo from "./data/name";
import * as matrixRepo from "./data/matrix"
import * as movesRepo from "./data/moves"
import * as fs from "fs";
import * as fs_extra from 'fs-extra';
import { pathForCurrentGame, GAME_NAME_FILE_NAME, MOVES_FILE_NAME, MATRIX_FILE_NAME, README_PATH, README_FILE_NAME } from "./constants";
import { reloadCurrentGame } from "./reload";
import { Matrix } from "./data/matrix";
import { embedReadme } from "./generators/readme";
import { Move } from "./data/moves";

export type Coord = {x: number, y : number}
export type Game = {matrix: Matrix, moves: Move[], name: string, ended: boolean, winningSymbol : string | null}

const createEmptyFile = (path : string) => {
    writeFile(path, "")
}
const writeFile = (path : string, data : string) => {
    fs.writeFileSync(path, data)
}
export const endCurrentGame = async (game : Game) => {
    game.ended = true
    game.winningSymbol = winningSymbol(game.matrix)
    await reloadCurrentGame(game, null)
    saveCurrentGame(game.name)
    newGame()
}
const saveCurrentGame = (name : string) => {
    const src = "./games/current"
    const dest = `./games/${name}`
    fs_extra.moveSync(src, dest)
}

export const nextTurnSymbol = (moves : Move[]) : string | null => {
    if(moves.length == 0) return null
    return moves[moves.length - 1].symbol == "x" ? "o" : "x"

}
export const newGame = async () => {
    if (!fs.existsSync("./games/current")){
        fs.mkdirSync("./games/current", {recursive: true});
    }
    const game = {matrix: [], moves: [], name: new Date().toISOString(), ended: false, winningSymbol : null}
    writeFile(pathForCurrentGame(GAME_NAME_FILE_NAME), game.name)
    createEmptyFile(pathForCurrentGame(MOVES_FILE_NAME))
    createEmptyFile(pathForCurrentGame(MATRIX_FILE_NAME))
    await reloadCurrentGame(game, 'x')
    propagateReadme(pathForCurrentGame(README_FILE_NAME))
}
export const propagateReadme = (readmePath : string) => {
    const readme = fs.readFileSync(readmePath, 'utf-8')
    const embedded = embedReadme(readme)
    fs.writeFileSync(README_PATH, embedded)
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

export const get = () : Game => {
    const matrix = matrixRepo.read()
    return {
        matrix: matrixRepo.read(),
        moves: movesRepo.read(),
        name: nameRepo.read(),
        ended: checkTie(matrix) || checkWin(matrix),
        winningSymbol: winningSymbol(matrix)
    }
}