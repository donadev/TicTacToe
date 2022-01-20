const fs = require("fs")
import ImageRotation from 'image-rotation'


const loadProgress = () => {
    const file = fs.readFileSync("progress.txt")
    return file.split("\n")
}

const rotate = (base64) => {
    const imageRotate = new ImageRotation(base64)
    imageRotate.generate(45, 'image/png') // 
}

const upper_left = 