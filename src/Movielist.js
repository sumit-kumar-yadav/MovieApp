import React from "react";
import MovieCard from "./MovieCard";

class MovieList extends React.Component {
  isMovieInCart = (movieId) => {
    return !!this.props.cartItems.find((item) => item.imdbID === movieId);
  };
  render() {
    const {
      movies,
      onAddStars,
      onDecStars,
      onToggleFav,
      onAddToCart,
      onRemoveFromCart,
    } = this.props;
    return (
      <>
        {movies.map((movie) => (
          <MovieCard
            isInCart={this.isMovieInCart(movie.imdbID)}
            addToCart={onAddToCart}
            removeFromCart={onRemoveFromCart}
            movie={movie}
            key={movie.id}
            onIncStars={() => onAddStars(movie.id)}
            onDecStars={() => onDecStars(movie.id)}
            onClickFav={() => onToggleFav(movie.id)}
          />
        ))}
      </>
    );
  }
}

export default MovieList;
