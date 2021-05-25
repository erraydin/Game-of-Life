import { myP5 } from "../../p5/sketch";

export type PreferencesProps = {
    myP5: React.MutableRefObject<myP5 | null>,
    wrapper: React.RefObject<HTMLDivElement>,
    initialSize: number,
}