import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../assets/css/home.css';
import '../assets/css/episodes.css';
import Adder from '../conponents/adder';
import gitimg from '../assets/images/gitwhite.png'

const Error = {
    nameError: (name) => (
        <div>
            <b>{name}</b> is not available on <b>TvShows4Mobile.Com</b>.
            The movie names are case sensitive, make sure the name is written as it appears on the website
            (with the correct character case). Example: <b>Agents of SHIELD</b>.
            visit <a href="https://tvshows4mobile.com" style={{ color: "#33C3F0" }}>tvshows4mobile.com</a> to get correct name.
        </div>
    ),
    seasonError: (name, season) => (
        <div>
            <b>{name}</b> has a maximum of <b>{season}</b> season(s) on <b>TvShows4Mobile.Com</b>.
            visit <a href={`https://tvshows4mobile.com/${name.replace(/\s+/g, "-")}`} style={{ color: "#33C3F0" }}>tvshows4mobile.com</a> to check the last season.
        </div>
    ),
    episodeError: (name, season, episode) => (
        <div>
            <b>{name} - Season {season}</b> has a maximum of <b>{episode}</b> episodes(s) on <b>TvShows4Mobile.Com</b>.
            visit <a href={`https://tvshows4mobile.com/${name.replace(/\s+/g, "-")}/Season-${season < 10 ? "0" + season : season}`} style={{ color: "#33C3F0" }}>tvshows4mobile.com</a> to check the last episode.
        </div>
    )
}

class Episodes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rightSpin: false,
            entry: props.name,
            link: `/${props.name.replace(/\s+/g, "-")}`,
            episodes: [],
            season: props.season,
            from: null,
            to: null,
            defValue: 1,
            showMore: false,
            defServer: null,
            useO2: false,
            error: null
        }

        this.checkValue = this.checkValue.bind(this)
        this.displayEpisodes = this.displayEpisodes.bind(this)
        this.useAdvanced = this.useAdvanced.bind(this)
        this.onLoadFrame = this.onLoadFrame.bind(this)

        this.state.defTo = this.state.from || 1
        this.state.episodes = this.displayEpisodes({}, true)
    }


    componentWillUpdate(props) {
        if (props.name !== this.props.name || props.season !== this.props.season) {
            var state = {
                entry: props.name,
                link: `/${props.name.replace(/\s+/g, "-")}`,
                season: props.season || this.state.season,
                error: null
            }
            this.setState({
                ...state,
                episodes: this.displayEpisodes({
                    name: props.name, ...state, updates: {
                        name: true, season: true
                    }
                }, true)
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

        var result = "/" + m + `${se !== "" ? "/" + se : ""}`

        this.setState({ link: result, entry: movie })
    }

    displayEpisodes(update, noUpdate) {

        var m = (update.name || this.props.name).replace(/(-)|\s+/g, "%20")

        var u = update.updates || {}

        var se = `${update.season || (!u.season ? this.state.season : null) || this.state.defValue}`

        if (se.length === 1) {
            se = "0" + se
        }

        var e1 = update.from || (!u.from ? this.state.from : null) || this.state.defValue

        var e2 = update.to || (!u.to ? this.state.to : null) || update.defTo || this.state.defTo

        var o = (update.useO2 == null && this.state.useO2) || update.useO2 ? "O2TvSeries.Com" : "TvShows4Mobile.Com"

        delete update.updates

        var eps = []

        for (var i = e1; i < e2 + 1; i++) {
            var d = update.defServer || (!u.defServer ? this.state.defServer : null) || Math.floor(Math.random() * 11) + 1

            var ep = `${i}`
            if (ep.length === 1) {
                ep = "0" + ep;
            }

            var s = "http://d" + d + ".tvshows4mobile.com/" + m + "/Season%20" + se + "/" + m + "%20-%20S" + se + "E" + ep + "%20(" + o + ").mp4"

            eps.push(s)
        }

        if (!noUpdate) {
            this.setState({ episodes: eps, ...update, rightSpin: !this.state.rightSpin })
        } else {
            return eps
        }
    }

    useAdvanced() {
        this.setState({
            showMore: !this.state.showMore,
        })
    }

    onLoadFrame() {
        this.frame.innerHTML
        console.log("loaded")
    }

    render() {
        return (
            <div style={{ backgroundColor: "rgb(51,51,51)", minHeight: '100vh', overflow: "hidden" }}>

                <div style={{
                    position: "absolute", right: "-50px", top: "50px", height: "100px", width: "100px",
                    backgroundColor: "#33C3F0", zIndex: "100", transform: "rotate(-45deg)", transformOrigin: "0 0"
                }} />

                <a href="https://github.com/goody-h/O2" style={{
                    position: "absolute", right: "5px", top: "55px", height: "20px", width: "20px",
                    zIndex: "200"
                }}> <img src={gitimg} alt="" style={{ height: "20px", width: "20px" }} /> </a>

                <div className="center-wrapper" style={{ backgroundColor: "#222", height: '50px', zIndex: "300", position: "relative" }}>
                    <form onSubmit={(e) => { e.preventDefault() }} className="container" style={{ maxWidth: "500px" }}>
                        <div className="" style={{ display: "inline-block", width: "80%" }}>
                            <input className="u-full-width" type="text"
                                placeholder="Enter Movie Name or Url" id="movie" ref="movie"
                                onChange={this.checkValue} value={this.state.entry} style={{ margin: "0" }} />
                        </div>
                        <div className="" style={{ display: "inline-block", width: "20%" }}>
                            <Link to={this.state.link} >
                                <input className="button-primary" type="submit" value="Go" style={{ width: "97%", textAlign: "center", padding: "0", margin: "0 0 0 3%" }} />
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="container" style={{ marginTop: "20px" }}>
                    <div className="row">
                        <div className="five columns" style={{ marginTop: "20px", borderLeft: "5px solid #33C3F0", paddingLeft: "10px", maxWidth: "175px" }}>
                            <span style={{ color: "white", marginRight: "5px" }}>Season:</span>
                            <Adder default={this.state.defValue} value={this.state.season}
                                onChange={(value) => { this.displayEpisodes({ season: value, updates: { season: true } }) }} />
                        </div>
                        <div className="seven columns" style={{ marginTop: "20px", borderLeft: "5px solid #33C3F0", paddingLeft: "10px" }}>
                            <span style={{ color: "white", marginRight: "5px" }}>Episode:</span>
                            <Adder default={this.state.defValue} value={this.state.from}
                                onChange={(value) => {
                                    const state = { from: value, defTo: value || 1, updates: { from: true, defTo: true } }
                                    if (this.state.to && value > this.state.to) {
                                        state.to = value
                                        state.updates.to = true
                                    }
                                    this.displayEpisodes(state)
                                }} />
                            <span style={{ color: "white", marginRight: "5px", marginLeft: "5px" }}>to</span>
                            <Adder default={this.state.defTo} value={this.state.to}
                                onChange={(value) => {
                                    const state = { to: value, updates: { to: true } }
                                    if (value && value < this.state.from) {
                                        state.from = value
                                        state.defTo = value || 1
                                        state.updates.from = true
                                        state.updates.defTo = true
                                    }
                                    this.displayEpisodes(state)
                                }} />
                        </div>
                    </div>

                    <div style={{ marginTop: "30px" }}>
                        <span onClick={this.useAdvanced} style={{ color: "#33C3F0", cursor: "pointer", marginRight: "20px", fontSize: "1.6rem" }}>{this.state.showMore ? "Show less <<" : "Show more >>"}</span>

                        <div style={{ padding: "5px 25px", display: `${this.state.showMore ? "inline-block" : "none"}`, border: "1px solid #33C3F0", borderRadius: "10px" }}>
                            <div style={{ display: "inline-flex", alignItems: "center" }}>
                                <span style={{ display: "inline-block", textAlign: "right", width: "75px", color: "white", margin: "5px 5px 5px 0" }}>Use O2Tv:</span>
                                <input type="checkbox" name="useO2" id="useO2" ref="useO2" checked={this.state.useO2}
                                    style={{ margin: "5px 0" }} onChange={() => {
                                        this.displayEpisodes({ useO2: !this.state.useO2 })
                                    }} />
                            </div>

                            <div style={{ display: "inline-block", margin: "5px 0 5px 25px" }}>
                                <span style={{ width: "50px", display: "inline-block", textAlign: "right", color: "white", marginRight: "5px" }}>Server:</span>
                                <Adder default={0} value={this.state.defServer}
                                    onChange={(value) => {
                                        this.displayEpisodes({ defServer: value, updates: { defServer: true } })
                                    }} />
                            </div>
                        </div>
                    </div>

                    {this.state.episodes.length > 0 ?
                        <div style={{ marginTop: "35px", paddingBottom: "50px" }}>
                            <div style={{ position: "relative", backgroundColor: "#33C3F0", height: "2px" }}>
                                <div className={this.state.rightSpin ? "spin-right" : "spin-left"} style={{
                                    display: "inline-block", position: "absolute",
                                    right: "20px", top: "-30px", cursor: "pointer", height: "24px", width: "24px"
                                }}
                                    onClick={() => {
                                        //this.frame.src = ""
                                        //this.frame.src = `http://tvshows4mobile.com/${this.props.name.replace(/\s+/g, "-")}`
                                        this.displayEpisodes({})
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#33C3F0" d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" /></svg>
                                </div>
                                <div style={{
                                    color: "#33C3F0", display: "inline-block", cursor: "pointer", position: "absolute",
                                    lineHeight: "24px", right: "60px", top: "-30px"
                                }}>
                                    need help?
                                </div>
                            </div>
                            {this.state.error ?
                                <div style={{ backgroundColor: "rgba(248, 14, 72, 0.863)", padding: "10px", color: "white", fontSize: "1.1rem", marginTop: "5px", borderRadius: "10px" }}>
                                    {this.state.error}
                                </div> : null}
                            <div style={{ marginTop: "25px" }}>
                                {this.state.episodes.map((v, i) => {
                                    return (
                                        <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                                            <button style={{ width: "30%", padding: "0px", textAlign: "center", margin: "0px" }}>
                                                <a className="button-primary" href={v} style={{ display: "inline-block", lineHeight: "38px", width: "100%" }}>
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
                        </div> : null}
                </div>
            </div>
        );
    }
}

export default Episodes;