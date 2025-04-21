import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, setAddedToCart}) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.cartQuantity); // ✅ Get cartQuantity

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
    .reduce((total, item) => {
      // Convert cost from string to numerical value, removing $ and commas
      const itemTotal = (parseFloat(item.cost.replace(/[$,]/g, '')) || 0) * (item.quantity || 0); // Ensure valid number
      return total + itemTotal;
    }, 0)
    .toFixed(2); // Return as a string with 2 decimal places
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
  console.log('Continue shopping');
  onContinueShopping();
  };

  // Handle incrementing quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    //TODO insert if,else statement here
  };

  // Handle decrementing quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } 
    else {
      handleRemove(item); // Remove item if quantity is reduced to zero
    }
  };

  // Handle removing an item
  const handleRemove = (item) => {
    // dispatch(removeItem(item.name));
    if (cartQuantity > 0) { // Ensure it doesn't go below zero
      dispatch(removeItem(item.name));
      dispatch(updateQuantity({ name: item.name, quantity: 0 })); // Reset quantity to 0 after removal
        // Enable the "Add to Cart" button by updating addedToCart state
      setAddedToCart((prevState) => ({
          ...prevState,
          [item.name]: false, // Re-enable button after removal
      }));
    }
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {

 // Convert cost from string to numerical value
 const cost = parseFloat(item.cost.replace(/[$,]/g, '')) || 0; // Remove $ and , and convert to float
 const quantity = item.quantity || 0; // Default to 0 if undefined
 return (cost * quantity).toFixed(2); // Ensure proper formatting
     
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;