const fs = require("fs")

const progressFile = "progress.txt"

const loadProgress = () => {
    var file = fs.readFileSync(progressFile, 'utf8')
    if(file == "" || file == null) file = "   \n   \n   "
    return file.split("\n").map(s => Array.from(s))
}
const writeProgress = (matrix) => {
    const lines = matrix.map(arr => arr.join(""))
    const data = lines.join("\n")
    fs.writeFileSync(progressFile, data, 'utf8')
}
const checkWinSymbol = (matrix, symbol) => {
    const patterns = [
        [1, 2, 3], [3, 6, 9], [1, 4, 7], [7, 8, 9], [1, 5, 9], [3, 5, 7], [2, 4, 8], [4, 5, 6]
    ]
    for(pattern of patterns) {
        const coords = pattern.map(getCoords)
        const won = coords.every(coord => matrix[coord.x][coord.y] == symbol)
        if(won) { 
            console.log(`🏆 ${symbol} symbol won!!!`)
            return true 
        }
    }
    return false
}
const checkWin = (matrix) => {
    return checkWinSymbol(matrix, "o") || checkWinSymbol(matrix, "x")
}
const checkTie = (matrix) => {
    if(checkWin(matrix)) return false
    const tie = matrix.every(row => row.every(c => c == "o" || c == "x"))
    if(tie) console.log("Oh no!!! It's a tie!!!!")
    return tie
}
const getCoords = (i) => {
    const a = i - 1
    return {x: parseInt(a / 3), y: parseInt(a % 3)}
}
const set = (i, symbol) => {
    const coords = getCoords(i), x = coords.x, y = coords.y
    console.log(x, y, symbol)
    var matrix = loadProgress()
    console.log("matrix", matrix)
    const place = matrix[x][y]
    console.log("place", place)
    if(place != "x" && place != "o") matrix[x][y] = symbol
    console.log("matrix", matrix)
    if(checkWin(matrix) || checkTie(matrix)) {
        matrix = []
    }
    writeProgress(matrix)
}

var args = process.argv.slice(2);

set(args[0], args[1])
