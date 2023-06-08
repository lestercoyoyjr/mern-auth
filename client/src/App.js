import logo from "./logo.svg";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./App.css";
import Register from "./Register";
import UserContext from "./UserContext";
import axios from "axios";
import Login from "./Login";

function App() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials:true})
    .then(response => {
      setEmail(response.data.email);
    });
  }, []);

  return (
    <UserContext.Provider value={{email, setEmail}}>
      <BrowserRouter>
        <div>
          {!!email && (
            <div>Logged in as {email}</div>
          )}
          {!email && (
            <div>Not logged in</div>
          )}
        </div>
        <hr/>
        <div>
          <Link to={"/"}>Home</Link> |<Link to={"/login"}>Login</Link> |
          <Link to={"/register"}>Register</Link>
        </div>
        <Switch>
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/login"} component={Login} />
        </Switch>
        <hr />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
