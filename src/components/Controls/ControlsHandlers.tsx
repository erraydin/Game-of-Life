import { myP5 } from "../../p5/sketch";

export const playButtonHandler = (
    myP5: React.MutableRefObject<myP5 | null>,
    setPlayButtonText: React.Dispatch<React.SetStateAction<string>>
) => {
    myP5.current!.playing = !myP5.current!.playing;
    if (myP5.current!.playing) setPlayButtonText("Pause");
    else setPlayButtonText("Play");
}