import { myP5 } from "../../p5/mySketch";

export const playButtonHandler = (
    myP5: React.MutableRefObject<myP5 | null>,
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    myP5.current!.playingToggle!();
    setPlaying(myP5.current!.isPLaying!())
}