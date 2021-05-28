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
    getGeneration?: () => number,
    nextFrame?: () => void,
    initBoard?: (initialPattern: string) => void
}


const defineSketch = (initialPattern: string) => {
    return (sketch: myP5) => {
        let playing = false;
        let size: number;
        let cellSize: number;
        let fps = 30;
        let initialBoard: Array<Array<number>>;
        let curBoard: Array<Array<number>>;
        let nextBoard: Array<Array<number>>;
        let generation = 0;
        let width: number;

        /*#######################################################################################
        ###############   PUBLIC FUNCTIONS TO MANIPUTALE P5 FROM OUTSIDE #######################
        #########################################################################################*/
        sketch.getGeneration = () => generation;
        sketch.getSize = () => size;
        sketch.isPLaying = () => playing;

        sketch.changeFps = (newFps) => {
            fps = newFps;
        }

        sketch.initBoard = (initialPattern) => {
            if (initialPattern === "empty") {
                size = 32;
                cellSize = width / 32;
                initialBoard = createEmptyBoard(size);
                curBoard = createEmptyBoard(size);
                nextBoard = createEmptyBoard(size);
            } else {
                initialBoard = pattern.get(initialPattern)!
                curBoard = deepCopy(initialBoard);
                size = initialBoard.length;
                cellSize = width / size;
                nextBoard = createEmptyBoard(size);
            }
        }

        sketch.changeSize = (newSize) => {
            // sketch.noLoop();
            size = newSize;
            cellSize = width / size;
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
            initialBoard = createEmptyBoard(size);
            curBoard = createEmptyBoard(size);
            nextBoard = createEmptyBoard(size);
            generation = 0;
        }


        sketch.changePattern = (newPatternName) => {
            initialBoard = pattern.get(newPatternName)!
            curBoard = deepCopy(initialBoard);
            size = initialBoard.length;
            cellSize = width / size;
            nextBoard = createEmptyBoard(size);
            generation = 0;
            playing = false;

        }

        sketch.nextFrame = () => {
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
            generation++;
            const temp = curBoard;
            curBoard = nextBoard;
            nextBoard = temp;
        }


        /*#######################################################################################
        #################################   P5's Own Functions  ##################################
        #########################################################################################*/

        sketch.setup = () => {
            const canvasDiv = document.getElementById("myCanvas");
            const divHeight = canvasDiv?.offsetHeight;
            const divWidth = canvasDiv?.offsetWidth;

            if (sketch.windowHeight < sketch.windowWidth) {
                width = divHeight! - 70;
                sketch.createCanvas(width!, width! + 30);
            } else {
                width = divWidth! - 40;
                sketch.createCanvas(width!, width! + 40);
            }
            console.log(width);
            // sketch.createCanvas(width!, width! + 40);
            sketch.initBoard!(initialPattern);
            // initialBoard = createEmptyBoard(size);
            // curBoard = createEmptyBoard(size);
            // nextBoard = createEmptyBoard(size);
            sketch.stroke(220);
            sketch.strokeWeight(1);
        }


        sketch.draw = () => {
            sketch.background('#eef0f1');
            sketch.frameRate(fps);
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (curBoard[i][j] === 1) {
                        sketch.fill(0);
                    } else {
                        sketch.fill('#eef0f1');
                    }
                    sketch.rect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
                }
            }
            sketch.fill(100);
            sketch.text("Generation: " + generation, width / 2 - 30, width + 30)
            if (playing) {
                sketch.nextFrame!();
            }
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