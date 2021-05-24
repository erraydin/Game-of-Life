import Canvas from "./Canvas";
import Controls from "./Controls";
import classes from "./Main.module.css";
import Patterns from "./Patterns";
import Preferences from "./Preferences";

const Main = () => {
    return (
        <div className={classes.mainContainer}>
            <Canvas />
            <div className={classes.column}>
                <div className={classes.row}>
                    <Preferences />
                    <Patterns />
                </div>
                <Controls />

            </div>
        </div>
    );
}

export default Main;