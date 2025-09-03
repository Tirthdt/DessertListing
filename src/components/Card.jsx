import { useCart } from "../context/useCart";

const Card = (props) => {
  const { addItemToCart, updateCartItemCount, deleteCartItem, cartItems } =
    useCart();

  const handleItemQuantity = (name, type) => {
    if (type === "decrement" && cartItems[props.name] === 1) {
      deleteCartItem(name);
    } else {
      const count =
        type === "decrement"
          ? cartItems[props.name] - 1
          : cartItems[props.name] + 1;
      updateCartItemCount(name, count);
    }
  };

  return (
    <div className={`card ${cartItems[props.name] ? "card-selected" : ""}`}>
      <img className="cardImage" src={props.image} alt="desktop image" />
      <div className="product-info">
        <p style={{ color: "var(--rose-400)" }}>{props.category}</p>
        <h4 style={{ color: "var(--rose-900)" }}>{props.name}</h4>
        <p style={{ color: "var(--red)", fontWeight: 700 }}>${props.price}</p>
      </div>
      {!cartItems[props.name] ? (
        <button
          onClick={(e) => addItemToCart(props.name)}
          className="btn addCartButton"
        >
          <img src="./icon-add-to-cart.svg" alt="add" />{" "}
          <span style={{ marginLeft: "10px" }}>Add to Cart</span>
        </button>
      ) : (
        <button
          onClick={(e) => {
            console.log(e);
            if (e.target.name) {
              handleItemQuantity(props.name, e.target.name);
            }
          }}
          className="btn toggleQuantityBtn"
        >
          <img
            src="./assets/images/icon-decrement-quantity.svg"
            alt="Icon Decrement"
            name="decrement"
          />
          <span>{cartItems[props.name]}</span>
          <img
            src="./assets/images/icon-increment-quantity.svg"
            alt="Icon Increment"
            name="increment"
          />
        </button>
      )}
    </div>
  );
};

export default Card;
