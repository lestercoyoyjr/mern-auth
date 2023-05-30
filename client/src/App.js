import logo from "./logo.svg";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to={'/login'}>Login</Link> |
        <Link to={'/register'}>Register</Link>
      </div>
      <Switch>
        <Route exact path={'/register'}>
          <Register/>
        </Route>
      </Switch>
      <hr/>
    </BrowserRouter>
  );
}

export default App;
