import { FunctionComponent, useEffect, useRef } from "react";
import p5 from "p5";
import defineSketch, { myP5 } from "../../p5/sketch";
import Controls from "../Controls/Controls";
import classes from "./Main.module.css";
import Patterns from "../Patterns/Patterns";
import Preferences from "../Preferences/Preferences";
import { empty, pattern } from "../../p5/presets"
import { RouteComponentProps } from "react-router-dom";


const Main: FunctionComponent<RouteComponentProps> = ({ match, history }) => {
    const wrapper = useRef<HTMLDivElement>(null);
    const myP5 = useRef<myP5 | null>(null);
    let myPattern: number[][];

    //When you change routes, you need to destroy the old p5 instance
    //Otherwise it continues to run and after 10 location changes app 
    //gets extremely slow and buggy
    history.listen((location) => {
        if (location.pathname !== match.path) {
            myP5.current?.remove();
        }

    })

    if (match.path === "/") {
        myPattern = empty;
    } else {
        myPattern = pattern.get(match.path.slice(9))!
    }

    const size = myPattern.length;

    useEffect(() => {
        if (wrapper.current !== null) {
            if (myP5.current) {
                console.log("Nooooo");
            }
            myP5.current = new p5(defineSketch(false, 600 / size, size, size, 20, myPattern!), wrapper.current)
            console.log("useEffectCalled");
        }
    }, [size, myPattern])


    return (
        <div className={classes.mainContainer}>
            <div className={classes.canvas} ref={wrapper} />
            <div className={classes.column}>
                <div className={classes.row}>
                    <Preferences myP5={myP5} wrapper={wrapper} initialSize={size} />
                    <Patterns />
                </div>
                <Controls myP5={myP5} />
            </div>
        </div>
    );
}

export default Main;