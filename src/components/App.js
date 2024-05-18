import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../reducers/moviesSlice';
import { data as moviesList } from '../data';

function App(props) {
  useEffect(() => {
    props.dispatch(addMovies(moviesList));
  }, []);

  const isMovieInFavourites = (movie) => {
    const { movies } = props;
    const index = movies.favourites.indexOf(movie);
    return index !== -1;
  };

  const changeTab = (val) => {
    props.dispatch(setShowFavourites(val));
  };

  const { movies } = props;
  const { list, showFavourites = [], favourites = [] } = movies;
  const displayMovies = showFavourites ? favourites : list;

  return (
    <div className="App">
      <Navbar/>
      <div className="main">
        <div className="tabs">
          <div
            className={`tab ${showFavourites ? '' : 'active-tabs'}`}
            onClick={() => changeTab(false)}
          >
            Movies
          </div>
          <div
            className={`tab ${showFavourites ? 'active-tabs' : ''}`}
            onClick={() => changeTab(true)}
          >
            Favourites
          </div>
        </div>

        <div id="list">
          {displayMovies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.imdbID}
              isFavourite={isMovieInFavourites(movie)}
            />
          ))}
          {displayMovies.length === 0 && (
            <div className="no-movies">No movies to display!</div>
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ movies, search }) {
  return {
    movies,
    search,
  };
}

const connectedComponent = connect(mapStateToProps)(App);
export default connectedComponent;