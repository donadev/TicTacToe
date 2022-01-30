import { refreshImage } from "./generators/image"
import { refreshReadme } from "./generators/readme"


import * as matrixRepo from "./data/matrix"
import * as movesRepo from "./data/moves"
import * as nameRepo from "./data/name"

import { pathForCurrentGame, OUTPUT_IMAGE_NAME, README_FILE_NAME } from "./constants"


export const reloadCurrentGame = (ended : boolean = false, winningSymbol : string | null = null) => {
    const matrix = matrixRepo.read(), moves = movesRepo.read(), date = nameRepo.read()
    const outputImagePath = pathForCurrentGame(OUTPUT_IMAGE_NAME)
    const outputReadme = pathForCurrentGame(README_FILE_NAME)
    refreshImage(matrix, outputImagePath)
    refreshReadme(matrix, moves, date, ended, winningSymbol, outputReadme)
}