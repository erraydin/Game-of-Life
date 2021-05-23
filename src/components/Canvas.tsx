import p5 from "p5";
import { FunctionComponent, useEffect, useRef, useState } from "react"
import defineSketch from "../p5/sketch";
export type canvasProps = {
    sketch: (sketch: p5) => void;
}

const Canvas: FunctionComponent<canvasProps> = ({ sketch }) => {
    // const [playing, setPlaying] = useState(false);
    const wrapper = useRef<HTMLDivElement>(null);
    const mySketch = defineSketch(20, 30, 30);

    useEffect(() => {
        if (wrapper.current !== null) {
            const myP5 = new p5(mySketch, wrapper.current);
        }
    }, [mySketch])

    return <div ref={wrapper} />
}

export default Canvas;