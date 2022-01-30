import * as fs from "fs"
import * as matrixRepo from "./data/matrix"
import * as movesRepo from "./data/moves"
import { Move } from "./data/moves"
import { checkWin, checkTie, endCurrentGame, winningSymbol, getCoords } from "./game"
import { reloadCurrentGame } from "./reload"



const execute = (move : Move) => {
    if(!(move.symbol == "x") && !(move.symbol == "o")) return
    const coords = getCoords(move.index), x = coords.x, y = coords.y
    console.log(x, y, move.symbol)
    var matrix = matrixRepo.read()
    console.log("matrix", matrix)
    const place = matrix[x][y]
    console.log("place", place)
    if(place != "x" && place != "o") matrix[x][y] = move.symbol
    console.log("matrix", matrix)
    matrixRepo.write(matrix)
    const moves = movesRepo.read().concat([move])
    movesRepo.write(moves)
    if(checkWin(matrix) || checkTie(matrix)) {
        endCurrentGame(matrix)
    }
    reloadCurrentGame()
}

var args = process.argv.slice(2);

const user = args[0]
const symbol = args[1]
const index = parseInt(args[2])
const move : Move = {user, symbol, index}

execute(move)