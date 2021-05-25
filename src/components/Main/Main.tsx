import { useEffect, useRef, useState } from "react";
import p5 from "p5";
// import defineSketch, { myP5 } from "../../p5/sketch";

import defineSketch, { myP5 } from "../../p5/mySketch";
import Controls from "../Controls/Controls";
import classes from "./Main.module.css";
import Patterns from "../Patterns/Patterns";
import Preferences from "../Preferences/Preferences";
import { useHistory } from "react-router-dom";



const Main = () => {

    const wrapper = useRef<HTMLDivElement>(null);
    const myP5 = useRef<myP5 | null>(null);
    const [size, setSize] = useState(32);
    const [playing, setPlaying] = useState(false);
    let patternName: string;
    const history = useHistory();


    history.listen((location) => {
        if (location.pathname === "/") {
            patternName = "empty";
        } else {
            patternName = location.pathname.slice(9);
        }

        if (wrapper.current !== null) {
            myP5.current!.changePattern!(patternName);
            setSize(myP5.current!.getSize!());
            setPlaying(false);
        }
    })


    useEffect(() => {
        if (wrapper.current !== null) {
            myP5.current = new p5(defineSketch(), wrapper.current)
            console.log("useEffectCalled");
        }
    }, [])

    return (
        <div className={classes.mainContainer}>
            <div className={classes.canvas} ref={wrapper} />
            <div className={classes.column}>
                <div className={classes.row}>
                    <Preferences myP5={myP5} size={size} setSize={setSize} setPlaying={setPlaying} />
                    <Patterns />
                </div>
                <Controls myP5={myP5} playing={playing} setPlaying={setPlaying} />
            </div>
        </div>
    );
}

export default Main;