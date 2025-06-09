import React from 'react';
import { useCart } from '../context/CartContext';

const ThankYou = () => {
  const { lastOrder } = useCart();

  const total = lastOrder.reduce(
    (acc, item) => acc + item.quantity * parseFloat(item.price),
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.receipt}>
        <h1 style={styles.heading}>🎉 Thank you for your purchase!</h1>
        <p style={styles.subheading}>Here’s your order summary:</p>

        {lastOrder.length === 0 ? (
          <p>No recent order found.</p>
        ) : (
          <div>
            {lastOrder.map(item => (
              <div key={item.variantId} style={styles.itemRow}>
                <div style={styles.itemInfo}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={styles.itemImage}
                  />
                  <div>
                    <p style={styles.itemTitle}>{item.title}</p>
                    <p style={styles.itemQty}>Qty: {item.quantity}</p>
                  </div>
                </div>
                <p style={styles.itemPrice}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div style={styles.totalRow}>
              <p style={styles.totalText}>Total Paid:</p>
              <p style={styles.totalAmount}>₹{total.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      <div style={styles.buttonGroup}>
        <button onClick={handlePrint} style={styles.printBtn}>
          🖨️ Print Receipt
        </button>
        <a href="/" style={styles.backBtn}>
          🔙 Back to Home
        </a>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  receipt: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: '10px',
    textAlign: 'center',
  },
  subheading: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#555',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  itemImage: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemTitle: {
    margin: 0,
    fontWeight: '600',
  },
  itemQty: {
    margin: 0,
    fontSize: '12px',
    color: '#777',
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '18px',
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
    marginTop: '20px',
  },
  totalText: {},
  totalAmount: {
    color: '#2e7d32',
  },
  buttonGroup: {
    marginTop: '30px',
    display: 'flex',
    gap: '15px',
  },
  printBtn: {
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  backBtn: {
    backgroundColor: '#555',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
  },
};

export default ThankYou;
