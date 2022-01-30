import { MATRIX_FILE_NAME, pathForCurrentGame } from "../constants"


const path = pathForCurrentGame(MATRIX_FILE_NAME)



export const read = () => {
    const file = fs.readFileSync(path, 'utf8')
    return file.split("\n").map(s => Array.from(s))

}

export const write = (matrix) => {
    const lines = matrix.map(arr => arr.join(""))
    const data = lines.join("\n")
    fs.writeFileSync(progressFile, data, 'utf8')
}