import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import '../assets/css/home.css';

class Home extends Component {

    constructor(props) {
        super(props)
        this.checkValue = this.checkValue.bind(this)

        this.state = {
            link: "/"
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

    render() {
        return (
            <div style={{ backgroundColor: "#222" }}>
                <div className="center-wrapper container" style={{ minHeight: '100vh' }}>

                    <div className="" style={{ width: "100%", maxWidth: "500px" }}>
                        <div className="ten columns" style={{ width: "75%" }}>
                            <input className="u-full-width" type="text"
                                placeholder="Enter Movie Name or Url" id="movie" ref="movie"
                                onChange={this.checkValue} />
                        </div>
                        <div className="two columns" style={{ width: "23%", marginLeft: "2%" }}>
                            <Link to={this.state.link} >
                                <input className="button-primary" type="submit" value="Go" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;