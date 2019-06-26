import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../assets/css/home.css';
import gitimg from '../assets/images/gitblue.png'

class Home extends Component {

    constructor(props) {
        super(props)
        this.checkValue = this.checkValue.bind(this)

        this.state = {
            link: "/"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        
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

        if (result !== "/") {
            this.setState({ link: result, entry: movie })
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: "#222" }}>
                <div className="container">
                    <div className="center-wrapper" style={{ minHeight: '100vh', position: "relative" }}>

                        <form onSubmit={(e)=>{e.preventDefault()}} style={{ width: "100%", maxWidth: "500px", position: "relative", paddingBottom: "70px" }}>
                            <div className="" style={{ display: "inline-block", width: "80%" }}>
                                <input required className="u-full-width" type="text"
                                    placeholder="Enter Movie Name or Url" id="movie" ref="movie"
                                    onChange={this.checkValue} style={{margin: "0"}} />
                            </div>
                            <div className="" style={{ display: "inline-block", width: "20%"}}>
                                <Link to={this.state.link} >
                                    <input className="button-primary" type="submit" value="Go" style={{ width: "97%", textAlign: "center", padding: "0", margin: "0 0 0 3%"}} />
                                </Link>
                            </div>
                        </form>
                        <div style={{position: "absolute", bottom: "0"}}>
                            <a href="https://github.com/goody-h/O2"> <img src={gitimg} alt="" style={{height: "80px", width: "80px"}}/> </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;