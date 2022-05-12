import '../App.css';
import {React, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './HomePage';
import NavBar from './NavBar';
import Signup from './account/Signup';
import Setup from './account/Setup';
import Login from './account/Login';
import Account from './account/Account';
import BrowsePage from './BrowsePage';
import NewListing from './NewListing';
import ListingPage from './ListingPage';

function App() {

  const [user, setUser] = useState(null);

  function getUser() {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
      else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  useEffect(() => {
    getUser();
  },[]);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user}/>
        <Switch>
          <Route exact path='/'>
            <HomePage user={user} />
          </Route>
          <Route exact path='/signup'>
            <Signup onLogin={setUser}/>
          </Route>
          <Route exact path='/setup'>
            <Setup setUser={setUser} user={user}/>
          </Route>
          <Route exact path='/login'>
            <Login onLogin={setUser}/>
          </Route>
          <Route path='/account'>
            <Account me={user} onLogin={setUser}/>
          </Route>
          <Route path='/browse'>
            <BrowsePage user={user}/>
          </Route>
          <Route exact path='/new-listing'>
            <NewListing user={user}/>
          </Route>
          <Route exact path='/listings/:id'>
            <ListingPage user={user}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
