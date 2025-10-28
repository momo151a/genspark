import { useEffect, useState } from 'react';
import { productsService } from '../services/products.service';
import { Loading } from '../components/common/Loading';

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productsService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <Loading message="Loading products..." />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="products-page">
      <div className="container">
        <h1>Our Products</h1>

        {products.length === 0 ? (
          <div className="empty-state">
            <p>No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.shortDescription}</p>
                <div className="product-footer">
                  <span className="price">${product.price}</span>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
