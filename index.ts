import { newGame } from "./lib/game";
import { execute } from "./lib/move";

const initGame = async () => {
    await newGame()
    
    await execute({user: "donadev", symbol: "x", index: 1})
    await execute({user: "evildev", symbol: "o", index: 4})
    await execute({user: "donadev", symbol: "x", index: 2})
    await execute({user: "evildev", symbol: "o", index: 5})
    await execute({user: "donadev", symbol: "x", index: 3})
}

initGame().then(console.log).catch(console.error)