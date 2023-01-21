import React from "react";

class MovieCard extends React.Component {
  handleCartButton = (movie) => {
    const { isInCart, addToCart, removeFromCart } = this.props;

    if (!isInCart) return addToCart(movie);
    return removeFromCart(movie);
  };

  render() {
    const { Title, Poster, Plot, imdbRating, Price, Favourite, Stars } =
      this.props.movie;

    return (
      <>
        <div className="main">
          <div className="movie-card">
            <div className="left">
              <img alt="poster" src={Poster} />
            </div>

            <div className="right">
              <div className="title">{Title}</div>
              <div className="plot">{Plot}</div>
              <div className="price">Rs: {Price}</div>

              <div className="footer">
                <div className="rating">Ratings: {imdbRating}</div>

                <span className="star-dis">
                  <img
                    className="str-btn"
                    alt="Subtract"
                    src="https://cdn-icons-png.flaticon.com/128/2801/2801932.png"
                    onClick={() => this.props.onDecStars(this.props.movie)}
                  />

                  <img
                    className="stars"
                    alt="stars"
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                  />

                  <img
                    className="str-btn"
                    alt="add"
                    src="https://cdn-icons-png.flaticon.com/128/2997/2997933.png"
                    onClick={() => this.props.onIncStars(this.props.movie)}
                  />

                  <span className="starCount">{Stars}</span>
                </span>

                <button
                  className={Favourite ? "unfavourite-btn" : "favourite-btn"}
                  onClick={() => this.props.onClickFav(this.props.movie)}
                >
                  {Favourite ? "UnFavourite" : "Favorite"}
                </button>

                <button
                  className={
                    !this.props.isInCart ? "cart-btn add" : "cart-btn remove"
                  }
                  onClick={() => this.handleCartButton(this.props.movie)}
                >
                  {!this.props.isInCart ? "Add to Cart" : "Remove from Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MovieCard;
