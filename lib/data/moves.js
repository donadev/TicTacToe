import { MOVES_FILE_NAME, pathForCurrentGame } from "../constants"


const path = pathForCurrentGame(MOVES_FILE_NAME)


export const read = () => {
    const file = fs.readFileSync(path, 'utf8')
    return file.split("\n").map(line => {
        const values = line.split(",")
        return {user: values[0], symbol: values[1], coord: values[2]}
    })
}

export const write = (moves) => {
    const lines = moves.map(move => move.join(","))
    const data = lines.join("\n")
    fs.writeFileSync(path, data, 'utf8')
}