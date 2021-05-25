import { patternList } from "../../p5/presets";
import classes from "./Patterns.module.css";
import { Link } from "react-router-dom";

const Patterns = () => {
    return (

        <div className={classes.row}>
            {patternList.map((pattern, index) => {
                return (
                    <Link key={index} to={"/pattern/" + pattern}>
                        <div className={classes.patternCard}>{pattern}</div>
                    </Link>
                )
            })}
        </div>

    );
}

export default Patterns;