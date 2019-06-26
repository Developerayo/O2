import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './assets/css/normalize.css';
import './assets/css/skeleton.css';
import './assets/css/App.css';
import Home from './pages/home';
import Episodes from './pages/episodes';

class App extends Component {
  render() {
    return (
      <div style={{position: 'relative', backgroundColor: "rgb(51,51,51)", minHeight: '100vh', overflowX: "hidden"}}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <EpisodesRoute path="/:name"/>
            <EpisodesRoute path="/:name/:season"/>
          </div>
        </BrowserRouter>
      </div>
    );
  }  
}

function EpisodesRoute({path}) {
  return (
    <Route
      exact
      path={path}
      render={({match}) => {
        var season = match.params["season"]
        var name = match.params["name"]
        if (season) {
          season = Number.parseInt(season)
          if (Number.isNaN(season)) {
            season = null
          }
        }
        if (name) {
          name = name.replace(/-/g, " ")
        }
        return <Episodes name={name} season={season}/>
      }}
    />
  )
}


export default App;
