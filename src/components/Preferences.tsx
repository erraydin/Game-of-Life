import classes from "./Preferences.module.css";

const Preferences = () => {
    return (
        <div className={classes.column}>
            <div>
                <h3>Size:</h3>
                <input
                    name="sizeSlider"
                    type="range"
                    min="5"
                    max="60"
                    defaultValue="30"
                    className={classes.slider} />
            </div>
            <div>
                <h3>Speed:</h3>
                <input
                    name="fpsSlider"
                    type="range"
                    min="1"
                    max="60"
                    defaultValue="20"
                    className={classes.slider} />
            </div>
            <button className={classes.populateButton}>
                Populate Randomly
            </button>
            <button className={classes.clearButton}>
                Clear
            </button>
        </div>
    );
}

export default Preferences;