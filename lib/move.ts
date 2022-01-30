import * as fs from "fs"
import * as matrixRepo from "./data/matrix"
import { Matrix } from "./data/matrix"
import * as movesRepo from "./data/moves"
import { Move } from "./data/moves"
import { checkWin, checkTie, endCurrentGame, winningSymbol, getCoords, nextTurnSymbol } from "./game"
import { reloadCurrentGame } from "./reload"



const canExecute = (move : Move, matrix : Matrix, moves : Move[]) => {
    //non posso inserire un simbolo diverso da x|o
    if(!(move.symbol == "x") && !(move.symbol == "o")) throw Error("Non puoi inserire un simbolo diverso da x oppure o")
    const coords = getCoords(move.index), x = coords.x, y = coords.y
    console.log(x, y, move.symbol)
    console.log("matrix", matrix)
    const place = matrix[x][y]
    //non posso inserire dove il campo è occupato
    if(place == "x" || place == "o") throw Error("Non puoi inserire in questa posizione, il campo è già occupato")
    //non posso inserire se non è il mio turno
    if(moves.length > 0 && nextTurnSymbol(moves) != move.symbol) throw Error("Non è il tuo turno!")
    return true 
    
}

const execute = (move : Move) => {
    const moves = movesRepo.read()
    var matrix = matrixRepo.read()
    if(!canExecute(move, matrix, moves)) return
    const coords = getCoords(move.index), x = coords.x, y = coords.y
    matrix[x][y] = move.symbol
    console.log("matrix", matrix)
    matrixRepo.write(matrix)
    const newMoves = moves.concat([move])
    movesRepo.write(newMoves)
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