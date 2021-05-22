import p5 from "p5";

const defineSketch = (w: number, columns: number, rows: number) => {
    return (sketch: p5) => {
        let curBoard: Array<Array<number>>;

        sketch.setup = () => {
            sketch.createCanvas(w * rows, w * columns);
            curBoard = new Array(rows);
            for (let i = 0; i < rows; i++) {
                curBoard[i] = new Array(columns);
                for (let j = 0; j < columns; j++) {
                    curBoard[i][j] = 1;
                }
            }
        }

        sketch.draw = () => {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    if (curBoard[i][j] === 0) {
                        sketch.fill(0);
                    } else {
                        sketch.fill(255);
                    }
                    sketch.stroke(0);
                    sketch.rect(i * w, j * w, w - 1, w - 1);
                }
            }
        }

        sketch.mouseDragged = () => {
            let row = Math.floor(sketch.mouseX / w);
            let col = Math.floor(sketch.mouseY / w);
            if (0 <= row && row < rows && 0 <= col && col < columns) {
                curBoard[row][col] = 0;
            }

        }

        sketch.mousePressed = () => {
            let row = Math.floor(sketch.mouseX / w);
            let col = Math.floor(sketch.mouseY / w);
            if (0 <= row && row < rows && 0 <= col && col < columns) {
                curBoard[row][col] = 0;
            }
        }

    }
}
export default defineSketch;

