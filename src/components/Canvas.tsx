import p5 from "p5";
import { FunctionComponent, useEffect, useRef, useState } from "react"
import defineSketch, { myP5 } from "../p5/sketch";

export type canvasProps = {
    sketch: (sketch: myP5) => void;
}

const Canvas: FunctionComponent<canvasProps> = ({ sketch }) => {
    const wrapper = useRef<HTMLDivElement>(null);
    const mySketch = defineSketch(20, 30, 30);
    let myP5: myP5;
    useEffect(() => {
        if (wrapper.current !== null) {
            myP5 = new p5(mySketch, wrapper.current);
        }
    }, [mySketch])

    return <div>
        <div ref={wrapper} />
        <button onClick={() => { myP5.playing = true; }}>Play</button>
    </div>
}

export default Canvas;