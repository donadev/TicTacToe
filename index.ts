import { newGame } from "./lib/game";
import { execute } from "./lib/move";

const run = async () => {
    await newGame()
    
    await execute({user: "a", symbol: "x", index: 1})
    await execute({user: "a", symbol: "o", index: 4})
    await execute({user: "a", symbol: "x", index: 2})
    await execute({user: "a", symbol: "o", index: 5})
    await execute({user: "a", symbol: "x", index: 3})
}

run().then(console.log).catch(console.error)