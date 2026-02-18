import ShoppingCart from '../components/ShoppingCart';

function CartPage({ cartItems, onRemoveOne, onClearCart, onCheckout }) {
  return (
    <div>
      <h1>Cart Page</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Go add something on the Products page.</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ShoppingCart
            cartItems={cartItems}
            onRemoveOne={onRemoveOne}
            onClearCart={onClearCart}
            onCheckout={onCheckout}
            variant="full"
          />
        </div>
      )}
    </div>
  );
}

export default CartPage;
