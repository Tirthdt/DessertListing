import { useEffect, useState, useMemo } from "react";
import { useCart } from "../context/useCart";
import { data } from "../data";

const Cart = () => {
  const { cartItems, deleteCartItem, clearCart } = useCart();

  const [orderItems, setOrderItems] = useState([]);

  const totalItems = useMemo(() => {
    return Object.values(cartItems).reduce((acc, curr) => acc + curr, 0) || 0;
  }, [cartItems]);

  useEffect(() => {
    const items = [];
    if (Object.keys(cartItems).length > 0) {
      Object.keys(cartItems).forEach((key) => {
        const item = data.find((d) => d.name === key);
        items.push([
          item.name,
          item.price,
          cartItems[key],
          item.image.thumbnail,
        ]);
      });
      setOrderItems(items);
    }
  }, [cartItems]);

  return (
    <>
      <div className="order-info">
        <div className="cart-card">
          <h1>Your Cart ({totalItems})</h1>
          {totalItems === 0 && (
            <div style={{ marginTop: "20px" }}>
              <img
                src="./assets/images/illustration-empty-cart.svg"
                alt="empty cart"
              />
              <p className="empty-cart-message">
                Your added items will appear here.
              </p>
            </div>
          )}
          {totalItems !== 0 && (
            <>
              {orderItems.map((orderItem) => {
                return (
                  <div key={orderItem[0]} className="order-item">
                    <div className="info">
                      <h5 style={{ marginBottom: "10px" }}>{orderItem[0]}</h5>
                      <div className="flex flex-even">
                        <div
                          className="quantity"
                          style={{
                            marginRight: "10px",
                            fontWeight: "700",
                            color: "var(--red)",
                          }}
                        >
                          {orderItem[2]}x
                        </div>
                        <div
                          className="price"
                          style={{
                            marginRight: "10px",
                            color: "var(--rose-400)",
                          }}
                        >
                          @${orderItem[1]}
                        </div>
                        <div
                          className="total"
                          style={{
                            marginRight: "10px",
                            color: "var(--rose-500)",
                            fontWeight: 700,
                          }}
                        >
                          ${orderItem[1] * orderItem[2]}
                        </div>
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        deleteCartItem(orderItem[0]);
                      }}
                    >
                      <img
                        src="./assets/images/icon-remove-item.svg"
                        alt="Remove item"
                      />
                    </button>
                  </div>
                );
              })}
              <div className="order-total">
                <span>Order Total</span>
                <h3>
                  $
                  {orderItems.reduce((acc, curr) => acc + curr[1] * curr[2], 0)}
                </h3>
              </div>
              <div className="message">
                <div>
                  <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
                </div>
                <span>
                  This is a <strong>carbon-neutral</strong> delivery
                </span>
              </div>
              <button
                className="confirmBtn"
                onClick={(e) =>
                  document
                    .getElementById("popupOverlay")
                    .classList.add("active")
                }
              >
                Confirm Order
              </button>
            </>
          )}
        </div>
      </div>
      <div className="popup-overlay" id="popupOverlay">
        <div className="popup" id="popup">
          <div className="popup-content">
            <img
              src="./assets/images/icon-order-confirmed.svg"
              alt="Order confirm"
            />
            <h1>Order Confirmed</h1>
            <p className="popup-message">We hope you enjoyed your food!</p>
            <div className="order-detail-list">
              {orderItems.map((orderItem) => {
                return (
                  <div key={orderItem[0]} className="order-detail-list-item">
                    <div className="order-item-info">
                      <img src={orderItem[3]} alt="thumbImage" />
                      <div className="item-details">
                        <h5>{orderItem[0]}</h5>
                        <p>
                          <span>{orderItem[2]}x</span>
                          <span>@${orderItem[1]}</span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="total"
                      style={{ marginRight: "20px", color: "var(--rose-900)" }}
                    >
                      <h5>${orderItem[2] * orderItem[1]}</h5>
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px 0",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ color: "var(--rose-500)" }}>Order Total</span>
                <h2 style={{ color: "var(--rose-900)" }}>
                  $
                  {orderItems.reduce((acc, curr) => acc + curr[1] * curr[2], 0)}
                </h2>
              </div>
            </div>
            <div
              className="confirmBtn"
              onClick={() => {
                clearCart();
                document
                  .getElementById("popupOverlay")
                  .classList.remove("active");
              }}
            >
              Start New Order
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
