import { myP5 } from "../p5/sketch"

export const PLAY = "PLAY";
export const PAUSE = "PAUSE";

export type playAction = {
    type: string,
    myP5: myP5
}

const playReducer = (state: boolean, action: playAction) => {
    switch (action.type) {
        case PLAY:
            action.myP5.playing = true;
            return true;
        case PAUSE:
            action.myP5.playing = false;
            return false;
        default:
            return state;
    }

}

export default playReducer;