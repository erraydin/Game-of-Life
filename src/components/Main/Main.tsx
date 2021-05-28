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
                <div className={classes.canvas} ref={wrapper} id="myCanvas" />
                <hr className={classes.hr} />
                <Controls myP5={myP5} playing={playing} setPlaying={setPlaying} />
            </div>
            <div className={classes.patternsPreferences}>
                <Patterns />
                <Preferences myP5={myP5} size={size} setSize={setSize} setPlaying={setPlaying} />

            </div>

            <div className={classes.info}>
                <div className={classes.textContainer}>
                    <h3>What is Game of Life? (from wikipedia)</h3>
                    <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. </p>

                    <h3>Rules: </h3>
                    <ul>
                        <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                        <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                        <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                        <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                    </ul>

                    <h3>Controls: </h3>
                    <ul>
                        <li>Use your mouse to draw an initial state. Or pick one of the existing ones from the Patterns menu.</li>
                        <li>Click play to see the system evolving.</li>
                        <li>Next button shows the next frame.</li>
                        <li>You can change the size and speed in the corresponding menu. Changing the size resets the board.</li>
                    </ul>

                    <p><em>Credits:</em> <a href="https://conwaylife.com/ref/lexicon/lex.htm">https://conwaylife.com/ref/lexicon/lex.htm</a> </p>
                </div>

            </div>

        </div>
    );
}

export default Main;