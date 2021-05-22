import p5 from "p5";
import { FunctionComponent, useEffect, useRef } from "react"

export type canvasProps = {
    sketch: (sketch: p5) => void;
}

const Canvas: FunctionComponent<canvasProps> = ({ sketch }) => {
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (wrapper.current !== null) {
            new p5(sketch, wrapper.current);
        }
    }, [sketch])

    return <div ref={wrapper} />
}

export default Canvas;