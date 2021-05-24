import { ChangeEvent } from "react";
import defineSketch, { myP5 } from "../../p5/sketch";
import p5 from "p5";


export const sizeSliderHandler = (
    event: ChangeEvent<HTMLInputElement>,
    myP5: React.MutableRefObject<myP5 | null>,
    wrapper: React.RefObject<HTMLDivElement>,
    fps: number,
) => {
    const num = +event.target.value;
    const playing = myP5.current!.playing;
    myP5.current?.remove();
    myP5.current = new p5(defineSketch(playing!, 600 / num, num, num, fps), wrapper.current!)
}

export const fpsSliderHandler = (
    event: ChangeEvent<HTMLInputElement>,
    myP5: React.MutableRefObject<myP5 | null>,
    setFps: React.Dispatch<React.SetStateAction<number>>
) => {
    const fps = +event.target.value;
    setFps(fps);
    myP5.current!.fps = fps;
}