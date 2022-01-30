import { refreshImage } from "./generators/image"
import { refreshReadme } from "./generators/readme"
import * as fs from "fs";


import { pathForCurrentGame, OUTPUT_IMAGE_NAME, README_FILE_NAME, README_PATH } from "./constants"
import { Game } from "./game"
import { embedReadme } from "./generators/readme";


export const reloadCurrentGame = async (game : Game, nextSymbol : string) => {
    console.log("reloadCurrentGame", game)
    const outputImagePath = pathForCurrentGame(OUTPUT_IMAGE_NAME)
    const outputReadme = pathForCurrentGame(README_FILE_NAME)
    await refreshImage(game.matrix, outputImagePath)
    const content = refreshReadme(game.moves, game.name, game.ended, game.winningSymbol, nextSymbol, outputReadme)
    propagateReadme(content)
}


const propagateReadme = (content : string) => {
    const embedded = embedReadme(content)
    fs.writeFileSync(README_PATH, embedded)
}