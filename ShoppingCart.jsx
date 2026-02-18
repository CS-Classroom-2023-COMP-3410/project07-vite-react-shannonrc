import Button from './Button';
// new file for teh shopping cart
function ShoppingCart({
  cartItems,
  onRemoveOne,
  onClearCart,
  onCheckout,
  variant = "summary"
}) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  // small version used on every page
  if (variant === "summary") {
    return (
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h3 style={{ marginTop: 0 }}>Cart Summary</h3>
        <p><strong>{totalItems}</strong> item(s) in your cart</p>
        <p><strong>Total:</strong> ${totalPrice}</p>
      </div>
    );
  }

  // full version used on products page + cart page
  return (
    <div style={{
      width: '300px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      alignSelf: 'flex-start',
      border: '1px solid #ddd'
    }}>
      <h3>Shopping Cart</h3>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {cartItems.map(item => (
              <li key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #ddd'
              }}>
                <div>
                  <strong>{item.title}</strong> × {item.quantity}
                  <div>${item.price * item.quantity}</div>
                </div>

                <Button
                  onClick={() => onRemoveOne(item.id)}
                  variant="danger"
                >
                  −
                </Button>
              </li>
            ))}
          </ul>

          <div style={{
            marginTop: '15px',
            padding: '10px 0',
            borderTop: '2px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <strong>Total:</strong>
            <strong>${totalPrice}</strong>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <Button
              onClick={onCheckout}
              variant="success"
            >
              Checkout
            </Button>

            <Button
              onClick={onClearCart}
              variant="secondary"
            >
              Clear
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
