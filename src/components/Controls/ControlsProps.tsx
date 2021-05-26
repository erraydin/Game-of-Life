import { myP5 } from "../../p5/mySketch";
export type ControlsProps = {
    myP5: React.MutableRefObject<myP5 | null>,
    playing: boolean,
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>
}