import { refreshImage } from "./generators/image"
import { refreshReadme } from "./generators/readme"


import { pathForCurrentGame, OUTPUT_IMAGE_NAME, README_FILE_NAME } from "./constants"
import { Game, propagateReadme } from "./game"


export const reloadCurrentGame = async (game : Game, nextSymbol : string) => {
    console.log("reloadCurrentGame", game)
    const outputImagePath = pathForCurrentGame(OUTPUT_IMAGE_NAME)
    const outputReadme = pathForCurrentGame(README_FILE_NAME)
    await refreshImage(game.matrix, outputImagePath)
    refreshReadme(game.moves, game.name, game.ended, game.winningSymbol, nextSymbol, outputReadme)
    propagateReadme(outputReadme)
}