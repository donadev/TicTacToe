import * as fs from "fs"
import * as matrix from "./data/matrix"
import { checkWin, checkTie, endCurrentGame, winningSymbol, getCoords } from "./game"



const set = (i : number, symbol : string) => {
    const coords = getCoords(i), x = coords.x, y = coords.y
    console.log(x, y, symbol)
    var matrix = matrix.read()
    console.log("matrix", matrix)
    const place = matrix[x][y]
    console.log("place", place)
    if(place != "x" && place != "o") matrix[x][y] = symbol
    console.log("matrix", matrix)
    matrix.write(matrix)
    if(checkWin(matrix) || checkTie(matrix)) {
        endCurrentGame(matrix)
    }
}

var args = process.argv.slice(2);

set(args[0] as unknown as number, args[1] as unknown as string)
