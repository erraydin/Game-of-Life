import { myP5 } from "../../p5/mySketch";

export type PreferencesProps = {
    myP5: React.MutableRefObject<myP5 | null>,
    size: number,
    setSize: React.Dispatch<React.SetStateAction<number>>,
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>
}