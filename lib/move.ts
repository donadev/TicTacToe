
import * as matrixRepo from "./data/matrix"
import * as movesRepo from "./data/moves"
import { Move } from "./data/moves"
import { checkWin, checkTie, endCurrentGame, winningSymbol, getCoords, nextTurnSymbol, get, Game } from "./game"
import { reloadCurrentGame } from "./reload"



const canExecute = (move : Move, game : Game) => {
    //non posso inserire un simbolo diverso da x|o
    if(!(move.symbol == "x") && !(move.symbol == "o")) return Error("Non puoi inserire un simbolo diverso da x oppure o")
    const coords = getCoords(move.index), x = coords.x, y = coords.y
    console.log("Coordinates", coords)
    const place = game.matrix[x][y]
    //non posso inserire dove il campo è occupato
    if(place == "x" || place == "o") return Error("Non puoi inserire in questa posizione, il campo è già occupato")
    //non posso inserire se non è il mio turno
    if(game.moves.length > 0 && nextTurnSymbol(game.moves) != move.symbol) return Error("Non è il tuo turno!")
    return null 
    
}

export const execute = async (move : Move) => {
    const game = get()
    console.log("Move", move)
    console.log("Game", game)
    const error = canExecute(move, game)
    if(error) {
        throw error
    } else {
        console.log("Execution authorized")
        const coords = getCoords(move.index), x = coords.x, y = coords.y
        game.matrix[x][y] = move.symbol
        matrixRepo.write(game.matrix)
        game.moves.push(move)
        movesRepo.write(game.moves)
        if(checkWin(game.matrix) || checkTie(game.matrix)) {
            await endCurrentGame(game)
        } else {
            await reloadCurrentGame(game, nextTurnSymbol(game.moves))
        }
    }
}

var args = process.argv.slice(2);

const user = args[0]
const symbol = args[1]
const index = parseInt(args[2])
const move : Move = {user, symbol, index}

execute(move).then(console.log).catch(console.error)