import { patternList } from "../../p5/presets";
import classes from "./Patterns.module.css";

const Patterns = () => {
    return (
        <div className={classes.row}>
            {patternList.map((pattern, index) => {
                return <div key={index} className={classes.patternCard}>{pattern}</div>
            })}
        </div>
    );
}

export default Patterns;