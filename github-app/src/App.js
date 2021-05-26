import './App.css';
import GithubUserSearch from './GithubUserSearch';
import GithubUser from './GithubUser';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

function NavBar() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/github/search">Github Search</Link>
      </li>
      <li>
        <Link to="/github/users/bhague1281">Brian's Github</Link>
      </li>
      <li>
        <Link to="/github/users/kbnewlon">Kayla's Github</Link>
      </li>
    </ul>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route exact path="/github/search" component={GithubUserSearch} />
          <Route path="/github/users/:username">
            <GithubUser />
          </Route>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
