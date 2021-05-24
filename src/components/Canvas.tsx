import p5 from "p5";
import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react"
import defineSketch, { myP5 } from "../p5/sketch";
import classes from "./Canvas.module.css";

export type canvasProps = {
    sketch: (sketch: myP5) => void;
}
// const mySketch = defineSketch(600 / 60, 60, 60);

const Canvas: FunctionComponent<canvasProps> = ({ sketch }) => {
    const [playButtonText, setPlayButtonText] = useState("Play");
    const [name, setName] = useState("ali")
    const wrapper = useRef<HTMLDivElement>(null);

    // const [myP5, setMyP5] = useState<myP5 | null>(null);
    const myP5 = useRef<myP5 | null>(null);
    // let myP5: myP5;
    useEffect(() => {
        if (wrapper.current !== null) {
            myP5.current = new p5(defineSketch(false, 600 / 60, 60, 60), wrapper.current)
            console.log("useEffectCalled");
        }
    }, [])

    const playButtonHandler = () => {
        myP5.current!.playing = !myP5.current!.playing;
        if (myP5.current!.playing) setPlayButtonText("Pause");
        else setPlayButtonText("Play");
    }

    const sizeSliderHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const num = +event.target.value;
        const playing = myP5.current!.playing;
        myP5.current?.remove();
        myP5.current = new p5(defineSketch(playing!, 600 / num, num, num), wrapper.current!)
    }

    return <div>
        <div ref={wrapper} />
        <div>{name}</div>
        <button onClick={playButtonHandler}>{playButtonText}</button>
        <div>
            <input
                onChange={sizeSliderHandler}
                type="range"
                min="5"
                max="60"
                defaultValue="30"
                className={classes.slider} />
        </div>
        <button onClick={() => {
            setName("veli")
            console.log("The current wrapper is: " + wrapper.current);
            console.log(myP5);
        }}>Veli</button>
    </div>

}

export default Canvas;