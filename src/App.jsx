import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProductsPage } from './pages/ProductsPage';
import { SalonPage } from './pages/SalonPage';
import { RankingPage } from './pages/RankingPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/salon" element={<SalonPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/purchase" element={<div className="pt-28">Purchase Page Coming Soon</div>} />
            <Route path="/category/:category" element={<div className="pt-28">Category Page Coming Soon</div>} />
            <Route path="/product/:slug" element={<div className="pt-28">Product Page Coming Soon</div>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
