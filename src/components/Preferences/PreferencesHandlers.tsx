import { ChangeEvent } from "react";
import { myP5 } from "../../p5/mySketch";


export const sizeSliderHandler = (
    event: ChangeEvent<HTMLInputElement>,
    myP5: React.MutableRefObject<myP5 | null>,
    setSize: React.Dispatch<React.SetStateAction<number>>,
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const newSize = +event.target.value;
    myP5.current!.changeSize!(newSize);
    setSize(newSize);
    setPlaying(false);

}

export const fpsSliderHandler = (
    event: ChangeEvent<HTMLInputElement>,
    myP5: React.MutableRefObject<myP5 | null>,
    setFps: React.Dispatch<React.SetStateAction<number>>
) => {
    const fps = +event.target.value;
    myP5.current!.changeFps!(fps);
    setFps(fps);
}

export const clearButtonHandler = (
    myP5: React.MutableRefObject<myP5 | null>,
) => {
    myP5.current!.clearPattern!();
}