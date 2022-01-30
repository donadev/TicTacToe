
export const FIELD_ASSET_PATH = "./assets/field.png"
export const README_ASSET_PATH = "./assets/readme_template.txt"

export const MOVES_FILE_NAME = "moves.txt"
export const MATRIX_FILE_NAME = "matrix.txt"
export const GAME_NAME_FILE_NAME = "name.txt"
export const README_FILE_NAME = "Readme.md"
export const OUTPUT_IMAGE_NAME = "output.png"

export const README_PATH = `./${README_FILE_NAME}`


export const pathForGame = (gameName, fileName) => {
    return `./games/${gameName}/${fileName}.png`
}
export const pathForCurrentGame = (fileName) => {
    return pathForGame("current", fileName)
}
/*

games/{game_name}
    - moves.txt
    - matrix.txt
    - date.txt //magari non serve
    - Readme.md

game_name = {current, any} any = iso_date

*/

