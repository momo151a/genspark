import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>Welcome to CareMé Beauty Reviews</h1>
          <p>Discover the best beauty powders through authentic reviews</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Browse Products
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose CareMé?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Authentic Reviews</h3>
              <p>Real reviews from real users</p>
            </div>
            <div className="feature-card">
              <h3>Quality Products</h3>
              <p>Curated selection of top beauty powders</p>
            </div>
            <div className="feature-card">
              <h3>Community Driven</h3>
              <p>Share your experience and help others</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
