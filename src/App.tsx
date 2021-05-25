import Main from "./components/Main/Main";
import {
  Redirect,
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import { patternList } from "./p5/presets";


function App() {
  return (
    <Router>
      <Switch>
        <Route
          path={"/"}
          exact
          render={(props) => (
            <Main {...props} />
          )}
        />
        {patternList.map((pattern, index) => {
          return (
            <Route
              key={index}
              path={"/pattern/" + pattern}
              exact
              render={(props) => (
                <Main {...props} />
              )}
            />
          )
        })}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
