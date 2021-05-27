import { patternList } from "../../p5/presets";
import classes from "./Patterns.module.css";
import { NavLink } from "react-router-dom";


const Patterns = () => {

    return (
        <div className={classes.patterns}>
            <h3 className={classes.title}>Famous patterns</h3>
            <hr />
            <div className={classes.container}>
                <div className={classes.innerContainer}>
                    {patternList.map((pattern, index) => {
                        return (
                            <NavLink activeClassName={classes.selected} className={classes.patternItem} key={index} to={"/pattern/" + pattern}>
                                <div >● {pattern}</div>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Patterns;