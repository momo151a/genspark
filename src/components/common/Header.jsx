import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth.service';

const LINE_OFFICIAL_URL = 'https://line.me/R/ti/p/@beautypowder';

const NAVIGATION_ITEMS = [
  { id: 'home', label: 'ホーム', icon: 'home', path: '/' },
  { id: 'ranking', label: 'ランキング', icon: 'trophy', path: '/ranking' },
  { id: 'beauty-powder', label: 'ビューティーパウダー', path: '/category/beauty-powder' },
  { id: 'wakonal', label: 'ワコナルビューティ', path: '/category/wakonal' },
  { id: 'hikari', label: 'ヒカリシリーズ', path: '/category/hikari' },
  { id: 'cleansing', label: 'クレンジング', path: '/category/cleansing' },
  { id: 'lotion', label: '化粧水', path: '/category/lotion' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, userProfile } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAuthClick = () => {
    if (currentUser) {
      // Navigate to profile or show profile menu
      // For now, we'll just log out
      handleLogout();
    } else {
      // Navigate to login
      window.location.href = '/login';
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto">
        {/* Main Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden text-gray-600 hover:text-rose-700"
              aria-label="Toggle mobile menu"
            >
              <FontAwesomeIcon icon="bars" className="text-xl" />
            </button>
            <Link
              to="/"
              className="text-xl sm:text-2xl font-light cursor-pointer"
              style={{ color: '#d4838f', fontFamily: 'Georgia, serif' }}
            >
              <FontAwesomeIcon icon="spa" className="mr-2" style={{ color: '#ffb5ba' }} />
              <span className="hidden sm:inline">ADAGIO LAB - </span>
              <span className="text-lg sm:text-xl">CareMé</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon - Mobile Only */}
            <button className="sm:hidden text-gray-600 hover:text-rose-700" aria-label="Search">
              <FontAwesomeIcon icon="search" />
            </button>

            {/* Login/Profile Button */}
            <button
              onClick={handleAuthClick}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full hover:bg-rose-50 transition-colors"
            >
              <FontAwesomeIcon icon="user-circle" className="text-gray-600" />
              <span className="hidden sm:block text-sm text-gray-700">
                {currentUser ? (userProfile?.name || 'プロフィール') : 'ログイン'}
              </span>
            </button>

            {/* LINE Purchase Button */}
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 btn-line"
            >
              <FontAwesomeIcon icon={['fab', 'line']} className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">LINEで購入</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs - Horizontal Scroll on Mobile */}
        <nav className="border-t border-rose-100">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex whitespace-nowrap px-4 sm:px-6">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = isActiveRoute(item.path);
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`nav-tab px-4 py-2.5 text-sm sm:text-base font-medium border-b-2 transition-all duration-300 ${
                      isActive
                        ? 'border-rose-400 text-rose-700'
                        : 'text-gray-600 hover:text-rose-700 border-transparent hover:border-rose-300'
                    }`}
                    style={isActive ? { color: '#d4838f' } : {}}
                  >
                    {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-1.5" />}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 mobile-menu-enter"
            onClick={toggleMobileMenu}
          >
            <div
              className="bg-white w-72 h-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-rose-100">
                <h2 className="text-lg font-medium" style={{ color: '#d4838f' }}>
                  メニュー
                </h2>
              </div>
              <nav className="p-4">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <div key={item.id}>
                    {index === 2 && <div className="border-t border-rose-100 my-3" />}
                    <Link
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className="block py-3 text-gray-700 hover:text-rose-700 transition-colors"
                    >
                      {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-3" />}
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
