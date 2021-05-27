import { useEffect, useRef, useState } from "react";
import p5 from "p5";
// import defineSketch, { myP5 } from "../../p5/sketch";

import defineSketch, { myP5 } from "../../p5/mySketch";
import Controls from "../Controls/Controls";
import classes from "./Main.module.css";
import Patterns from "../Patterns/Patterns";
import Preferences from "../Preferences/Preferences";
import { useHistory } from "react-router-dom";


const findPatternName = (path: string): string => {
    if (path === "/") return "empty";
    else return path.slice(9);
}

const Main = () => {

    const wrapper = useRef<HTMLDivElement>(null);
    const myP5 = useRef<myP5 | null>(null);
    const [size, setSize] = useState(32);
    const [playing, setPlaying] = useState(false);
    const history = useHistory();
    // console.log(history);

    const path = history.location.pathname;
    console.log(path);

    useEffect(() => {
        if (wrapper.current !== null) {
            console.log(findPatternName(path));
            myP5.current = new p5(defineSketch(findPatternName(path)), wrapper.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    history.listen((location) => {
        if (location.pathname === "/") {
            if (wrapper.current !== null) {
                myP5.current!.changeSize!(32);
                setSize(32);
            }

        } else {
            let patternName = location.pathname.slice(9);
            if (wrapper.current !== null) {
                myP5.current!.changePattern!(patternName);
                setSize(myP5.current!.getSize!());
                setPlaying(false);
            }
        }
    })


    return (
        <div className={classes.mainContainer}>
            <div className={classes.column}>
                <div className={classes.canvas} ref={wrapper} />
                <Controls myP5={myP5} playing={playing} setPlaying={setPlaying} />
            </div>
            <div className={classes.column}>

                <Preferences myP5={myP5} size={size} setSize={setSize} setPlaying={setPlaying} />
                <Patterns />
            </div>

        </div>
    );
}

export default Main;