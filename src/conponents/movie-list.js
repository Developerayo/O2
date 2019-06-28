import React, { Component } from 'react';
import series from './series'

class MovieList extends Component {
    render() {
        return (
            <datalist id={this.props.id}>
                {series.list.map((v, i) => <option key={i} value={v} />)}
                {series.irregulars.map((v, i) => <option key={i} value={v} />)}
            </datalist>
        );
    }
}

export default MovieList;