import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SAMPLE_PRODUCTS = [
  {
    id: 'beauty-powder-001',
    name: 'ビューティーパウダー',
    slug: 'beauty-powder',
    price: 3980,
    image_url: 'https://images.unsplash.com/photo-1615396899839-c99c121888ae?w=400',
    description: '美容と健康をサポートする高品質パウダー',
    category_name: 'ビューティーパウダー'
  },
  {
    id: 'wakonal-001',
    name: 'ワコナルビューティー',
    slug: 'wakonal-beauty',
    price: 4980,
    image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    description: 'コラーゲン配合の美容ドリンク',
    category_name: 'ワコナルビューティ'
  },
  {
    id: 'hikari-001',
    name: 'ヒカリノシオ',
    slug: 'hikari-no-shio',
    price: 1980,
    image_url: 'https://images.unsplash.com/photo-1613478881426-0993c3d6e9f1?w=400',
    description: '天然塩配合の美容サプリメント',
    category_name: 'ヒカリシリーズ'
  }
];

export function Carousel({ products = SAMPLE_PRODUCTS, title = '人気商品' }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mobileCarouselRef = useRef(null);

  // Display products - ensure at least 3 items
  const displayProducts = products.length > 0
    ? products.length < 3
      ? [...products, ...products, ...products].slice(0, 3)
      : products
    : SAMPLE_PRODUCTS;

  // Triple products for desktop infinite loop
  const tripleProducts = [...displayProducts, ...displayProducts, ...displayProducts];

  // Handle mobile carousel scroll
  useEffect(() => {
    const carousel = mobileCarouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const slideWidth = carousel.offsetWidth * 0.8; // 80vw
      const newSlide = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProduct = (index) => {
    const carousel = mobileCarouselRef.current;
    if (!carousel) return;

    const slideWidth = carousel.offsetWidth * 0.8;
    carousel.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
    setCurrentSlide(index);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-light mb-4" style={{ color: '#d4838f', fontFamily: 'Georgia, serif' }}>
            <FontAwesomeIcon icon="star" className="mr-3" style={{ color: '#ffb5ba' }} />
            {title}
          </h2>
          <div className="w-24 h-1 mx-auto" style={{ background: 'linear-gradient(to right, #ffe4e1, #ffb5ba)' }}></div>
        </div>

        {/* Mobile Carousel - Snap Scroll */}
        <div className="sm:hidden">
          <div
            ref={mobileCarouselRef}
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            <div className="flex">
              {displayProducts.map((product, index) => (
                <div
                  key={`mobile-${product.id}-${index}`}
                  className="flex-shrink-0 w-[80vw] snap-center px-2"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{product.category_name || 'ビューティーパウダー'}</p>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description || '美容と健康をサポートする高品質パウダー'}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold" style={{ color: '#d4838f' }}>
                          ¥{product.price?.toLocaleString() || '3,980'}
                        </span>
                        <Link
                          to={`/product/${product.slug}`}
                          className="px-4 py-1.5 text-sm rounded-full text-white hover:shadow-lg transition-all btn-primary"
                        >
                          詳細を見る
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {displayProducts.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => scrollToProduct(index)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ backgroundColor: index === currentSlide ? '#d4838f' : '#ffe4e1' }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid - Simple Grid Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product, index) => (
            <div
              key={`desktop-${product.id}-${index}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover img-zoom"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product.category_name || 'ビューティーパウダー'}</p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description || '美容と健康をサポートする高品質パウダー'}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold" style={{ color: '#d4838f' }}>
                    ¥{product.price?.toLocaleString() || '3,980'}
                  </span>
                  <Link
                    to={`/product/${product.slug}`}
                    className="px-4 py-1.5 text-sm rounded-full text-white hover:shadow-lg transition-all btn-primary"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
