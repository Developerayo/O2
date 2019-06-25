import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import '../assets/css/home.css';
import '../assets/css/episodes.css';
import Adder from '../conponents/adder';


class Episodes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            entry: props.name,
            link: `/${props.name.replace(/\s+/g, "-")}`,
            episodes: [],
            season: props.season,
            from: null,
            to: null,
            defValue: 1
        }


        this.checkValue = this.checkValue.bind(this)
        this.displayEpisodes = this.displayEpisodes.bind(this)

        this.state.defTo = this.state.to || 1
        this.state.episodes = this.displayEpisodes({}, true)
    }


    componentWillUpdate(props) {
        if (props.name !== this.props.name || props.season !== this.props.season) {
            this.setState ({
                entry: props.name,
                link: `/${props.name.replace(/\s+/g, "-")}`,
                episodes: [],
                season: props.season,
                from: null,
                to: null,
                defValue: 1,
                defTo: this.state.to || 1,
                episodes: this.displayEpisodes({name: props.name}, true)
            })
        }
    }

    checkValue() {
        var movie = this.refs.movie.value;

        var gb = movie.replace(/^(\s*.com\/)|^(\/)/, "").split("/")

        var m = gb[0].replace(/\s+/g, "-")

        var se = gb[1]
        if (se && se.search(/Season-[0-9][0-9]/) !== -1) {
            se = se.substr(7, 2)
            if (se.length === 1) {
                se = "0" + se
            }
        } else {
            se = ""
        }

        var result = "/" + m + `${se != ""? "/" + se : ""}`

        if (result !== "/") {
            this.setState({ link: result, entry: movie })
        }
    }

    displayEpisodes(update, noUpdate) {

        var m = (update.name || this.props.name).replace(/(-)|\s+/g, "%20")

        var se = `${update.season || this.state.season || this.state.defValue}`

        if (se.length == 1) {
            se = "0" + se
        }

        var e1 = update.from || this.state.from || this.state.defValue
        var e2 = update.to || this.state.to || update.defTo || this.state.defTo

        var o = "TvShows4Mobile.Com"

        //if (document.getElementById("o2").checked) {
        //    o = "O2TvSeries.Com"
        //}

        var eps = []

        for (var i = e1; i < e2 + 1; i++) {
            var d = /* document.getElementById("server").value || */ Math.floor(Math.random() * 11) + 1

            var ep = `${i}`
            if (ep.length == 1) {
                ep = "0" + ep;
            }

            var s = "http://d" + d + ".tvshows4mobile.com/" + m + "/Season%20" + se + "/" + m + "%20-%20S" + se + "E" + ep + "%20(" + o + ").mp4"

            eps.push(s)
        }
        if (!noUpdate) {
            this.setState({ episodes: eps, ...update })
        } else {
            return eps
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: "rgb(51,51,51)", minHeight: '100vh' }}>
                <div className="center-wrapper" style={{ backgroundColor: "#222", height: '50px' }}>

                    <div className="container" style={{ width: "100%", maxWidth: "500px" }}>
                        <div className="ten columns" style={{ width: "75%" }}>
                            <input className="u-full-width" type="text"
                                placeholder="Enter Movie Name or Url" id="movie" ref="movie"
                                onChange={this.checkValue} value={this.state.entry} style={{ marginBottom: 0 }} />
                        </div>
                        <div className="two columns" style={{ width: "23%", marginLeft: "2%" }}>
                            <Link to={this.state.link} >
                                <input className="button-primary" type="submit" value="Go" style={{ marginBottom: 0 }} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: "20px" }}>
                    <div className="row" style={{}}>
                        <div className="five columns" style={{ marginTop: "20px", borderLeft: "5px solid #33C3F0", paddingLeft: "20px" }}>
                            <span style={{ color: "white", marginRight: "10px" }}>Season:</span>
                            <Adder default={this.state.defValue} value={this.state.season}
                                onChange={(value) => { this.displayEpisodes({ season: value }) }} />
                        </div>
                        <div className="seven columns" style={{ marginTop: "20px", borderLeft: "5px solid #33C3F0", paddingLeft: "20px" }}>
                            <span style={{ color: "white", marginRight: "10px" }}>Episode:</span>
                            <Adder default={this.state.defValue} value={this.state.from}
                                onChange={(value) => {
                                    const state = { from: value, defTo: value || 1 }
                                    if (this.state.to && value > this.state.to) {
                                        state.to = value
                                    }
                                    this.displayEpisodes(state)
                                }} />
                            <span style={{ color: "white", marginRight: "5px", marginLeft: "5px" }}>to</span>
                            <Adder default={this.state.defTo} value={this.state.to}
                                onChange={(value) => {
                                    const state = { to: value }
                                    if (value && value < this.state.from) {
                                        state.from = value
                                        state.defTo = value || 1
                                    }
                                    this.displayEpisodes(state)
                                }} />
                        </div>
                    </div>

                    <div style={{ marginTop: "40px" }}>
                        {this.state.episodes.map((v, i, a) => {
                            return (
                                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                                    <button style={{ width: "30%", padding: "0px", textAlign: "center", margin: "0px" }}>
                                        <a className="button-primary" href={v} style={{ display: "inline-block", lineHeight: "38px", width: "100%"}}>
                                            Episode {i + (this.state.from || this.state.defValue)}
                                        </a>
                                    </button>

                                    <div style={{ color: "rgb(131, 131, 131)", padding: "0px 20px", overflow: "hidden", margin: "5px 0px", height: "28px", lineHeight: "28px", display: "inline-block", backgroundColor: "white", width: "70%" }}>
                                        {v.replace(/(http:\S+[0-9][0-9]\/)/, "").replace(/%20/g, " ")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        );
    }
}

export default Episodes;