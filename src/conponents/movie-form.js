import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieList from '../conponents/movie-list';

class MovieForm extends Component {
    render() {
        return (
            <form className={this.props.className} onSubmit={(e) => { e.preventDefault() }} 
            style={{ maxWidth: "500px", ...this.props.style }}>
                <div style={{ display: "inline-block", width: "80%" }}>
                    <input required className="u-full-width" type="text"
                        placeholder="Enter Movie Name or Url" id="movie"
                        onChange={this.props.checkValue} {...this.props.param} 
                        style={{ margin: "0" }} list="movieList" />
                    <MovieList id="movieList" />
                </div>
                <div className="" style={{ display: "inline-block", width: "20%" }}>
                    <Link to={this.props.link} >
                        <input className="button-primary" type="submit" value="Go" 
                        style={{ width: "97%", textAlign: "center", padding: "0", margin: "0 0 0 3%" }} />
                    </Link>
                </div>
                {this.props.children}
            </form>
        );
    }
}

export default MovieForm;