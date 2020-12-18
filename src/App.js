// Libs
import React, { Component } from 'react';
import axios from 'axios'
import './App.css'


class Filme extends Component {

  state = {
    movies: [],
    series: []

  }

  async componentDidMount() {
    const response = await axios.get(`${process.env.REACT_APP_API}/movies`);

    this.setState({
      movies: response.data
    });

    const filmes = response.data.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`

      };
    });

    this.setState({
      movies: filmes
    });

    const series = await axios.get(`${process.env.REACT_APP_API}/shows`);

    this.setState({
      series: series.data
    });

    const shows = series.data.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`

      };
    });

    this.setState({
      series: shows
    })
  }

  render() {
    return (
      <div>
        <div className="box-title">
          <h1>TTN CINE</h1>
        </div>
        <p className="classificacao-filmes">Filmes</p>
        <div className="box-map-filmes">
          {this.state.movies.map((item, index) => (
            <div className="box-return-map" key={index} >
              <img className="img-filmes" src={item.poster_path} alt="" />
              <div>
                <p>{item.vote_average}</p>
                <p>{item.release_date}</p>
              </div>
            </div>
          ))}
        </div>
          <p className="classificacao-serie">Séries</p>
        <div className="box-map-series">
          {this.state.series.map((item, index) => (
            <div className="box-return-map-series" key={index}>
              <img className="img-series" src={item.poster_path} alt="" />
              <div>
                <p>{item.vote_average}</p>
                <p>{item.first_air_date}</p>
              </div>              
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Filme;
