import p5 from "p5";
import { mod } from "../utils/mod";
import { pattern, createEmptyBoard } from "./presets";
import { deepCopy } from "../utils/deepCopy";

export type myP5 = p5 & {
    changePattern?: (patternName: string) => void,
    changeFps?: (fps: number) => void,
    changeSize?: (size: number) => void,
    playingToggle?: () => void,
    isPLaying?: () => boolean,
    getSize?: () => number,
    clearPattern?: () => void,
    getGeneration?: () => number
}


const defineSketch = () => {
    return (sketch: myP5) => {
        let playing = false;
        let size = 32;
        let cellSize = 600 / size;
        let fps = 30;
        let patternName = "empty";
        let initialBoard: Array<Array<number>>;
        let curBoard: Array<Array<number>>;
        let nextBoard: Array<Array<number>>;
        let generation = 0;

        /*#######################################################################################
        ###############   PUBLIC FUNCTIONS TO MANIPUTALE P5 FROM OUTSIDE #######################
        #########################################################################################*/
        sketch.getGeneration = () => generation;
        sketch.getSize = () => size;
        sketch.isPLaying = () => playing;

        sketch.changeFps = (newFps) => {
            fps = newFps;
        }

        sketch.changeSize = (newSize) => {
            // sketch.noLoop();
            size = newSize;
            cellSize = 600 / size;
            initialBoard = createEmptyBoard(size);
            curBoard = createEmptyBoard(size);
            nextBoard = createEmptyBoard(size);
            generation = 0;
            playing = false;
            // sketch.loop();
        }

        sketch.playingToggle = () => {
            playing = !playing;
        }

        sketch.clearPattern = () => {
            patternName = "empty";
            initialBoard = createEmptyBoard(size);
            curBoard = createEmptyBoard(size);
            nextBoard = createEmptyBoard(size);
            generation = 0;
        }


        sketch.changePattern = (newPatternName) => {
            patternName = newPatternName;
            initialBoard = pattern.get(patternName)!
            curBoard = deepCopy(initialBoard);
            size = initialBoard.length;
            cellSize = 600 / size;
            nextBoard = createEmptyBoard(size);
            generation = 0;
            playing = false;

        }


        /*#######################################################################################
        #######################   P5's Own Functions and private helpers #########################
        #########################################################################################*/

        sketch.setup = () => {
            sketch.createCanvas(600, 620);
            initialBoard = createEmptyBoard(size);
            curBoard = createEmptyBoard(size);
            nextBoard = createEmptyBoard(size);
            sketch.stroke(240);
            sketch.strokeWeight(1);
        }


        sketch.draw = () => {
            sketch.background(255);
            sketch.frameRate(fps);
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (curBoard[i][j] === 1) {
                        sketch.fill(0);
                    } else {
                        sketch.fill(255);
                    }
                    sketch.rect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
                }
            }
            sketch.fill(100);
            sketch.text("Generation: " + generation, 270, 618)
            if (playing) {
                nextFrame();
                generation++;
            }
        }

        const nextFrame = () => {
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    let neighbors = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            neighbors += curBoard[mod(row + i, size)][mod(col + j, size)];
                        }
                    }
                    neighbors -= curBoard[row][col];
                    //Loneliness and overpopulation
                    if (curBoard[row][col] === 1 &&
                        (neighbors < 2 || neighbors > 3)) {
                        nextBoard[row][col] = 0;
                        // Reproduction
                    } else if (curBoard[row][col] === 0 && neighbors === 3) {
                        nextBoard[row][col] = 1;
                    } else {
                        nextBoard[row][col] = curBoard[row][col];
                    }
                }
            }
            const temp = curBoard;
            curBoard = nextBoard;
            nextBoard = temp;
        }

        sketch.mouseDragged = () => {
            let col = Math.floor(sketch.mouseX / cellSize);
            let row = Math.floor(sketch.mouseY / cellSize);
            if (
                0 <= row &&
                row < size &&
                0 <= col &&
                col < size
            ) {
                curBoard[row][col] = 1;
            }

        }

        sketch.mousePressed = () => {
            let col = Math.floor(sketch.mouseX / cellSize);
            let row = Math.floor(sketch.mouseY / cellSize);
            if (
                0 <= row &&
                row < size
                && 0 <= col
                && col < size
            ) {
                curBoard[row][col] = 1;
            }
        }

    }
}
export default defineSketch;