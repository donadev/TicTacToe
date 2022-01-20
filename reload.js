const fs = require("fs")
const sharp = require("sharp")

const loadProgress = () => {
    const file = fs.readFileSync("progress.txt", 'utf8')
    return file.split("\n")
}


const fieldImage = "assets/field.png"
const outputFile = "assets/output.png"
const imageFor = (row, column, symbol) => {
    const i = parseInt(row), j = parseInt(column)
    const id = i * 3 + j + 1
    return `assets/${symbol}/${id}.png` 
}

const overlapAndSave = (images) => {
    if(images == null || images.length == 0) return
    sharp(fieldImage)
    .composite(images.map(image => {
        return {input: image}
    }))
    .toFile(outputFile, function(err) {
        console.log("error: ", err)
    });
}

const getImages = () => {
    const matrix = loadProgress()
    const images = []
    for(row in matrix) {
        for(column in matrix[row]) {
            const symbol = matrix[row][column]
            if(symbol == "o" || symbol == "x") {
                images.push(imageFor(row, column, symbol))
            }
        }
    }
    return images
}

const images = getImages()
console.log("images", images)
overlapAndSave(images)