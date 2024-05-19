import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, {useEffect, useState } from 'react';
import Notes from './components/Notes';
import EditNote from './components/EditNote';
import NewNote from './components/NewNote';
import './App.css';

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(()=> {
    fetch("/notes").then(
      Response => Response.json()
    ).then (
      data => {
        setBackendData(data)
      }
    )
  })
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Notes />
        </Route>
        <Route path="/notes/new">
          <NewNote />
        </Route>
        <Route path="/notes/:id/edit">
          <EditNote />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
