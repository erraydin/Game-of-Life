import { myP5 } from "../../p5/mySketch";

export const playButtonHandler = (
    myP5: React.MutableRefObject<myP5 | null>,
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    myP5.current!.playingToggle!();
    setPlaying(myP5.current!.isPLaying!())
}

export const nextButtonHandler = (
    myP5: React.MutableRefObject<myP5 | null>,
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    if (myP5.current?.isPLaying!()) {
        myP5.current.playingToggle!();
        setPlaying(false);
    }
    myP5.current?.nextFrame!();
}