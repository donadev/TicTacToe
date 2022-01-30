
export const FIELD_ASSET_PATH = "./assets/field.png"
export const README_ASSET_PATH = "./assets/readme_template.txt"
export const MAIN_README_ASSET_PATH = "./assets/main_readme_template.txt"

export const MOVES_FILE_NAME = "moves.txt"
export const MATRIX_FILE_NAME = "matrix.txt"
export const GAME_NAME_FILE_NAME = "name.txt"
export const README_FILE_NAME = "README.md"
export const OUTPUT_IMAGE_NAME = "output.png"

export const README_PATH = `./${README_FILE_NAME}`


export const pathForGame = (gameName : string, fileName : string) : string => {
    return `./games/${gameName}/${fileName}`
}
export const pathForCurrentGame = (fileName : string) : string => {
    return pathForGame("current", fileName)
}
