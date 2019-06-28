import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './assets/css/normalize.css';
import './assets/css/skeleton.css';
import './assets/css/App.css';
import Home from './pages/home';
import Episodes from './pages/episodes';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      list: []
    }

  }

  onLoadMovieList(e) {
    var p = e.target.getElementsByClassName("data_list")

    var series = []

    if (p.length > 0) {
        p = p.item(0).getElementsByClassName("data")

        for (let i = 0; i < p.length; i++) {
            const a = p.item(i).getElementsByTagName("a");

            if (a.length > 0) {
                var name = a.item(0).innerHTML
                series.push(name)
            }
        }
        this.setState({list: series})
    }
  }

  render() {
    return (
      <div style={{position: 'relative', backgroundColor: "rgb(51,51,51)", minHeight: '100vh', overflowX: "hidden"}}>
        <BrowserRouter>
          <div>
            <Route exact path="/" render={() => <Home list={this.state.list}/>} />
            <EpisodesRoute path="/:name" list={this.state.list}/>
            <EpisodesRoute path="/:name/:season" list={this.state.list}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }  
}

function EpisodesRoute({path, list}) {
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
        return <Episodes name={name} season={season}  list={list}/>
      }}
    />
  )
}


export default App;
