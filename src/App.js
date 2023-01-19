import React, { Component } from "react";
import MovieList from "./Movielist";
import Navbar from "./Navbar";
import firebase from 'firebase';

import { data } from "./data";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      cartItems: [],
    };
  }

  // Reading data from firebase when component is mounted (Updates automatically)
  componentDidMount() {
    firebase.firestore()
      .collection("cartItems")
      .onSnapshot(snapshot => {
        const cartItems = snapshot.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ cartItems: cartItems});
      });

    firebase.firestore()
      .collection("movies")
      .onSnapshot(snapshot => {
        const movies = snapshot.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ movies: movies});
      });

      // If movies are already added to firebase data, then don't add again 
      firebase.firestore().collection("movies")
        .get().then(snapshot => {
          let allDocRefs = snapshot.docs;
          if(allDocRefs.length == 0){
            // Add movies to the firebase data
            data.forEach((movie)=>{
              firebase.firestore()
                .collection("movies")
                .add(movie)
            });
          }
        });

  }

  handleAddStars = (movieId) => {
    const docRef = firebase.firestore().collection("movies").doc(movieId);

    docRef.get().then(snapshot => {
      let movie = snapshot.data();
      if(movie.Stars < 5){
        docRef
          .update({Stars: movie.Stars + 1})
          .then(() => {
            console.log("Updated sucessfully");
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  handleDecStars = (movieId) => {
    const docRef = firebase.firestore().collection("movies").doc(movieId);

    docRef.get().then(snapshot => {
      let movie = snapshot.data();
      if(movie.Stars > 0){
        docRef
          .update({Stars: movie.Stars - 1})
          .then(() => {
            console.log("Updated sucessfully");
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  handleToggleFav = (movieId) => {

    const docRef = firebase.firestore().collection("movies").doc(movieId);

    docRef.get().then(snapshot => {
      let movie = snapshot.data();
      docRef
        .update({Favourite: !movie.Favourite})
        .then(() => {
          console.log("Updated sucessfully");
        })
        .catch(error => {
          console.log(error);
        });
    });

  };

  handleResetCart = () => {
    firebase.firestore()
      .collection("cartItems")
        .get()
        .then(docs => {
          docs.forEach(doc => {
            doc.ref.delete();
          });
        });
  };

  handleAddToCart = (movie) => {
    
    firebase.firestore()
      .collection("cartItems")
      .add(movie)
      .then(docRef => {
        console.log("Movie has been added, docRef is: ", docRef);

        docRef.get().then(snapshot => {
          console.log("Movie has been added", snapshot.data());
        });

      })
      .catch(error => {
        console.log('Error while adding movie to cart: ', error);
      });

  };


  handleRemoveFromCart = (movie) => {

    const docRef = firebase.firestore().collection("cartItems").doc(movie.id);

    docRef
      .delete()
      .then(() => {
        console.log("Movie removed from cart sucessfully");
      })
      .catch(err => {
        console.log("Error while removing a movie from cart.", err);
      });

  };


  getTotal = () => {
    let total = 0;
    if (!this.state.cartItems.length) return 0;
    this.state.cartItems.forEach((item) => {
      total += item.Price;
    });

    return total;
  };

  render() {
    return (
      <div className="App">
        <Navbar
          cartItems={this.state.cartItems}
          onResetCart={this.handleResetCart}
        />
        <MovieList
          cartItems={this.state.cartItems}
          movies={this.state.movies}
          onAddStars={this.handleAddStars}
          onDecStars={this.handleDecStars}
          onToggleFav={this.handleToggleFav}
          onAddToCart={this.handleAddToCart}
          onRemoveFromCart={this.handleRemoveFromCart}
        />
        <div className="checkout">
          <span>Movies Count: {this.state.cartItems.length}</span>
          <span>
            Total Cost: <strong>₹{this.getTotal()}</strong>
          </span>
        </div>
      </div>
    );
  }
}

export default App;
