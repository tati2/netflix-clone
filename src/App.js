// Libs
import React, { Component } from 'react';
import axios from 'axios'
import './App.css'


class Filme extends Component {

 state = {
   movies: [],
   series:[]

 }

async componentDidMount(){
  const response = await axios.get(`${process.env.REACT_APP_API}/movies`);
  
  this.setState({
    movies: response.data
  });

  const filmes= response.data.map((item) => {
    return {
    ...item,
    poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`

    };    
  });
  
  this.setState({
    movies:filmes
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
    series:shows
  })
}

  render() {
    return (
      <div>
        <div className="box-title">
          <h1>TTN CINE</h1>
        </div>
        <div className="box-map-filmes">
          <p className="classificacao-filmes">Filmes</p>
          {this.state.movies.map((item, index) => (
            <div className="box-return-map"  key={index} >
              <h2 className="names-filmes">{item.title}</h2>
              <img className="img-filmes" src={item.poster_path} alt=""/>
              <p className="descricao">{item.overview}</p>
              <p className="data">{item.release_date}</p>
            </div>
          ))}
        </div> 
        <div className="box-map-series">
          <p className="classificacao-serie">Séries</p>
          {this.state.series.map((item, index) => (
            <div className="box-return-map-series" key={index}>
              <h2 className="names-serie">{item.name}</h2>
              <img className="img-series" src={item.poster_path} alt=""/>
              <p className="descricao-serie">{item.overview}</p>
              <p className="data-serie">{item.first_air_date}</p>
            </div>
          ))}
        </div>    
      </div> 
     
    );
  }
}

export default Filme;
