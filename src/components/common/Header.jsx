import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth.service';

const LINE_OFFICIAL_URL = 'https://line.me/R/ti/p/@beautypowder';

const NAVIGATION_ITEMS = [
  { id: 'home', label: 'ホーム', icon: 'home', path: '/' },
  { id: 'salon', label: 'サロン', icon: 'spa', path: '/salon' },
  { id: 'ranking', label: 'ランキング', icon: 'trophy', path: '/ranking' },
  { id: 'purchase', label: '購入', icon: 'shopping-bag', path: '/purchase' },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto">
        {/* Main Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden text-gray-600 hover:text-rose-700"
              aria-label="Toggle mobile menu"
            >
              <FontAwesomeIcon icon="bars" className="text-xl" />
            </button>
            <Link
              to="/"
              className="flex items-center space-x-2 cursor-pointer"
            >
              {/* CM Logo Square */}
              <div
                className="w-10 h-10 flex items-center justify-center rounded"
                style={{ backgroundColor: '#ffb5ba' }}
              >
                <span className="text-white font-bold text-lg">CM</span>
              </div>
              {/* CareMé Text */}
              <span
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: '#d4838f', fontFamily: 'Georgia, serif' }}
              >
                CareMé
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* User Info / Login Button */}
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full border text-sm font-medium transition-colors"
                  style={{
                    borderColor: '#ffb5ba',
                    color: '#666',
                    backgroundColor: 'white',
                  }}
                >
                  ログイン
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full text-white text-sm font-medium transition-colors"
                  style={{ backgroundColor: '#ffb5ba' }}
                >
                  新規登録
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* User Name Display */}
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full">
                  {userProfile?.avatarUrl || currentUser.photoURL ? (
                    <img
                      src={userProfile?.avatarUrl || currentUser.photoURL}
                      alt={userProfile?.name || currentUser.displayName || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon="user"
                        className="text-gray-500 text-xs"
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {userProfile?.name || currentUser.displayName || 'ユーザー'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full border text-sm font-medium transition-colors"
                  style={{
                    borderColor: '#ffb5ba',
                    color: '#666',
                    backgroundColor: 'white',
                  }}
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Bar - Vertical Icons with Text Below */}
        <nav className="hidden sm:block border-t border-gray-200">
          <div className="flex">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = isActiveRoute(item.path);
              const isPurchase = item.id === 'purchase';

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex-1 flex flex-col items-center justify-center py-3 transition-all duration-300 relative ${
                    isActive && !isPurchase
                      ? 'bg-rose-100'
                      : isPurchase
                      ? ''
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  style={
                    isPurchase
                      ? { backgroundColor: '#22c55e' }
                      : isActive
                      ? { backgroundColor: '#ffe4e1' }
                      : {}
                  }
                >
                  {/* Icon */}
                  <div className="mb-1">
                    {isPurchase ? (
                      <div className="relative">
                        {/* LINE-like bubble: white speech bubble in light green rounded square */}
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center relative"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                        >
                          {/* Speech bubble shape */}
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'white' }}
                          >
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="text-green-600 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={`text-xl ${
                          isActive
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <span
                    className={`text-xs font-medium ${
                      isPurchase
                        ? 'text-white'
                        : isActive
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active Underline */}
                  {isActive && !isPurchase && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: '#dc2626' }}
                    />
                  )}
                </Link>
              );
            })}
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
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className="block py-3 text-gray-700 hover:text-rose-700 transition-colors"
                  >
                    {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-3" />}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
