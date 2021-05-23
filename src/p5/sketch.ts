import p5 from "p5";

export type myP5 = p5 & { playing?: boolean }
const defineSketch = (
    w: number,
    columns: number,
    rows: number,
) => {
    return (sketch: myP5) => {
        sketch.playing = false;
        let curBoard: Array<Array<number>>;
        let nextBoard: Array<Array<number>>;
        sketch.setup = () => {
            sketch.createCanvas(w * rows, w * columns);
            sketch.frameRate(10);
            curBoard = new Array(rows);
            nextBoard = new Array(rows);
            for (let i = 0; i < rows; i++) {
                curBoard[i] = new Array(columns);
                nextBoard[i] = new Array(columns);
                for (let j = 0; j < columns; j++) {
                    curBoard[i][j] = 0;
                    nextBoard[i][j] = 0;
                }
            }

        }

        sketch.draw = () => {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    if (curBoard[i][j] === 1) {
                        sketch.fill(0);
                    } else {
                        sketch.fill(255);
                    }
                    sketch.stroke(200);
                    sketch.rect(i * w, j * w, w - 1, w - 1);
                }
            }
            if (sketch.playing) {
                nextFrame();
            }


        }

        const nextFrame = () => {
            for (let row = 1; row < rows - 1; row++) {
                for (let col = 1; col < columns; col++) {
                    let neighbors = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            neighbors += curBoard[row + i][col + j];
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
            let row = Math.floor(sketch.mouseX / w);
            let col = Math.floor(sketch.mouseY / w);
            if (0 <= row && row < rows && 0 <= col && col < columns) {
                curBoard[row][col] = 1;
            }

        }

        sketch.mousePressed = () => {
            let row = Math.floor(sketch.mouseX / w);
            let col = Math.floor(sketch.mouseY / w);
            if (0 <= row && row < rows && 0 <= col && col < columns) {
                curBoard[row][col] = 1;
            }
        }

    }
}
export default defineSketch;

