import * as fs from 'fs'
import sharp from 'sharp'
import { FIELD_ASSET_PATH } from '../constants'
import { Matrix } from '../data/matrix'

const imageFor = (row : number, column : number, symbol : string) => {
    const id = row * 3 + column + 1
    return `assets/${symbol}/${id}.png` 
}

const overlapAndSave = async (images : string[], outputPath : string) => {
    await sharp(FIELD_ASSET_PATH)
        .composite(images.map(image => {
            return { input: image }
        }))
        .toFile(outputPath);
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

export const refreshImage = async (matrix : Matrix, outputPath : string) => {
    const images = getImages(matrix)
    return await overlapAndSave(images, outputPath)
}