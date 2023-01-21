import React, { Component } from "react";
import CartList from "./CartList";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showCartList: false };
  }

  toggleCartList = () => {
    this.setState({ showCartList: !this.state.showCartList });
  };

  render() {
    const { cartItems, onResetCart, onRemoveFromCart } = this.props;

    return (
      <div style={styles.nav}>
        {this.state.showCartList && (
          <CartList
            items={cartItems}
            onReset={onResetCart}
            removeFromCart={onRemoveFromCart}
            toggleCartList={this.toggleCartList}
          />
        )}
        <div style={styles.cartIconContainer} onClick={this.toggleCartList}>
          <img
            style={styles.cartIcon}
            src="https://cdn-icons-png.flaticon.com/128/891/891462.png"
            alt="cart-icon"
          />
          <span style={styles.cartCount}>{cartItems.length}</span>
        </div>
      </div>
    );
  }
}

const styles = {
  cartIcon: {
    height: 48,
    marginRight: 20,
  },
  nav: {
    height: 70,
    background: "#4267b2",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  cartIconContainer: {
    position: "relative",
    cursor: "pointer",
  },
  cartCount: {
    background: "orange",
    borderRadius: "50%",
    padding: "4px 8px",
    position: "absolute",
    right: 10,
    top: -5,
    fontSize: 12,
  },
};

export default Navbar;
