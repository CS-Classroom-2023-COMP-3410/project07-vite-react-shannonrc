import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // products here so stock updates across all the files
  const initialProducts = [
    {
      id: 1,
      title: 'Smartphone',
      description: 'Latest model with advanced features',
      price: 699,
      stock: 15,
      imageUrl: 'https://via.placeholder.com/300x150?text=Smartphone'
    },
    {
      id: 2,
      title: 'Laptop',
      description: 'Powerful laptop for work and gaming',
      price: 1299,
      stock: 8,
      imageUrl: 'https://via.placeholder.com/300x150?text=Laptop'
    },
    {
      id: 3,
      title: 'Headphones',
      description: 'Noise-cancelling wireless headphones',
      price: 249,
      stock: 23,
      imageUrl: 'https://via.placeholder.com/300x150?text=Headphones'
    },
    {
      id: 4,
      title: 'Smartwatch',
      description: 'Fitness tracking and notifications',
      price: 199,
      stock: 12,
      imageUrl: 'https://via.placeholder.com/300x150?text=Smartwatch'
    }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [sortBy, setSortBy] = useState('default');

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
  };

  const addToCart = (product) => {
    const productInState = products.find(p => p.id === product.id);
    if (!productInState || productInState.stock <= 0) return;

    setProducts(products.map(p =>
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    ));

    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (!item) return;

    setProducts(products.map(p =>
      p.id === productId ? { ...p, stock: p.stock + 1 } : p
    ));

    if (item.quantity > 1) {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCartItems(cartItems.filter(item => item.id !== productId));
    }
  };

  const clearCart = () => {
    // restore stock for all items in cart
    const updatedProducts = products.map(p => {
      const cartItem = cartItems.find(item => item.id === p.id);
      if (!cartItem) return p;
      return { ...p, stock: p.stock + cartItem.quantity };
    });

    setProducts(updatedProducts);
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const checkout = () => {
    alert(`Checkout completed for $${totalPrice}!`);
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return (
          <ProductsPage
            products={products}
            sortBy={sortBy}
            setSortBy={setSortBy}
            addToCart={addToCart}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onCheckout={checkout}
          />
        );
      case 'profile':
        return <ProfilePage />;
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onRemoveOne={removeFromCart}
            onClearCart={clearCart}
            onCheckout={checkout}
          />
        );
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
      />

      <main>
        {renderPage()}

     
        {cartCount > 0 && (
          <ShoppingCart
            cartItems={cartItems}
            onRemoveOne={removeFromCart}
            onClearCart={clearCart}
            onCheckout={checkout}
            variant="summary"
          />
        )}
      </main>

      <footer style={{
        marginTop: '50px',
        padding: '20px',
        borderTop: '1px solid #eee',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>React Multi-Page Application</p>
      </footer>
    </div>
  );
}

export default App;
