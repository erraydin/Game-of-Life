import p5 from "p5";

const s = (sketch: p5) => {
    sketch.setup = () => {
        sketch.createCanvas(400, 400);
        sketch.background(200);
    }

    sketch.draw = () => {
        if (sketch.mouseIsPressed) {
            sketch.ellipse(sketch.mouseX, sketch.mouseY, 80, 80);
        }
    }
}

export default s;