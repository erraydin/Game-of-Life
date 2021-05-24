import p5 from "p5";
import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react"
import defineSketch, { myP5 } from "../p5/sketch";
import classes from "./Canvas.module.css";

export type canvasProps = {
    sketch: (sketch: myP5) => void;
}


const Canvas: FunctionComponent<canvasProps> = ({ sketch }) => {
    const [playButtonText, setPlayButtonText] = useState("Play");
    const [fps, setFps] = useState(20);
    const [name, setName] = useState("ali")
    const wrapper = useRef<HTMLDivElement>(null);
    const myP5 = useRef<myP5 | null>(null);
    console.log(window.innerHeight);
    useEffect(() => {
        if (wrapper.current !== null) {
            myP5.current = new p5(defineSketch(false, 600 / 30, 30, 30, 20), wrapper.current)
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
        myP5.current = new p5(defineSketch(playing!, 600 / num, num, num, fps), wrapper.current!)
    }

    const fpsSliderHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const fps = +event.target.value;
        setFps(fps);
        myP5.current!.fps = fps;

    }

    return <div>
        <div className={classes.sketch} ref={wrapper} />
        <div>{name}</div>
        <button onClick={playButtonHandler}>{playButtonText}</button>
        <div>
            <label htmlFor="fpsSlider">Speed: {fps} fps</label>
            <input
                name="fpsSlider"
                onChange={fpsSliderHandler}
                type="range"
                min="1"
                max="60"
                defaultValue="20"
                className={classes.slider} />
        </div>

        <div>
            <label htmlFor="sizeSlider">Size:</label>
            <input
                name="sizeSlider"
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