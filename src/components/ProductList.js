import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useCart } from '../context/CartContext';

// GraphQL query to fetch products from Shopify Storefront API
const PRODUCTS_QUERY = gql`
  query Products($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          productType
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ProductList = () => {
  const { addToCart } = useCart();
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  const [sortKey, setSortKey] = useState('title');
  const [limit] = useState(50);
  const [productTypes, setProductTypes] = useState([]);

  const queryParts = ['available_for_sale:true'];
  const queryString = queryParts.join(' AND ');

  const { loading, error, data, refetch } = useQuery(PRODUCTS_QUERY, {
    variables: { first: limit, query: queryString },
  });

  // Extract unique product types for filter dropdown
  useEffect(() => {
    if (data?.products?.edges) {
      const types = data.products.edges
        .map(({ node }) => node.productType)
        .filter((type) => type && type.trim() !== '');
      const uniqueTypes = Array.from(new Set(types));
      setProductTypes(uniqueTypes);
    }
  }, [data]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const liveQueryParts = ['available_for_sale:true'];
    if (searchText) liveQueryParts.push(`title:*${searchText}*`);
    if (category) liveQueryParts.push(`product_type:${category}`);
    const liveQuery = liveQueryParts.join(' AND ');
    refetch({ first: limit, query: liveQuery });
  };

  // Sort products by title or price
  const sortedProducts = [...(data?.products.edges || [])].sort((a, b) => {
    const productA = a.node;
    const productB = b.node;
    if (sortKey === 'price') {
      const priceA = parseFloat(productA.variants.edges[0].node.price.amount);
      const priceB = parseFloat(productB.variants.edges[0].node.price.amount);
      return priceA - priceB;
    }
    return productA.title.localeCompare(productB.title);
  });

  return (
    <div>
      <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="">All Categories</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="title">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#6b21a8', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && sortedProducts.length === 0 && <p>No products found.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {!loading && !error && sortedProducts.map(({ node }) => {
          const variant = node.variants.edges[0].node;
          const imageUrl = node.images.edges[0]?.node.url;

          return (
            <div
              key={node.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '15px',
                backgroundColor: '#ffffff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.05)';
              }}
            >
              {imageUrl && <img src={imageUrl} alt={node.title} style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '8px' }} />}
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '10px 0', color: '#333' }}>{node.title}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{node.description}</p>
              <p style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>₹{variant.price.amount}</p>
              <button
                onClick={() => addToCart(node)}
                style={{
                  marginTop: '10px',
                  padding: '10px 16px',
                  backgroundColor: '#6b21a8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;