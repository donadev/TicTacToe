import * as fs from 'fs'
import * as sharp from 'sharp'
import { FIELD_ASSET_PATH } from '../constants'
import { Matrix } from '../data/matrix'

const imageFor = (row : number, column : number, symbol : string) => {
    const id = row * 3 + column + 1
    return `assets/${symbol}/${id}.png` 
}

const overlapAndSave = (images : string[], outputPath : string) => {
    if(images == null || images.length == 0) return
    sharp(FIELD_ASSET_PATH)
    .composite(images.map(image => {
        return {input: image}
    }))
    .toFile(outputPath, function(err) {
        console.log("error: ", err)
    });
}

const getImages = (matrix : Matrix) : string[] => {
    const images = []
    for(const row in matrix) {
        for(const column in matrix[row]) {
            const i = parseInt(row), j = parseInt(column)
            const symbol = matrix[i][j]
            if(symbol == "o" || symbol == "x") {
                images.push(imageFor(i, j, symbol))
            }
        }
    }
    return images
}

export const refreshImage = (matrix : Matrix, outputPath : string) => {
    const images = getImages(matrix)
    return overlapAndSave(images, outputPath)
}