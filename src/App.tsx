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
          component={Main}
        />
        {patternList.map((pattern, index) => {
          return (
            <Route
              key={index}
              path={"/pattern/" + pattern}
              exact
              component={Main}
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
