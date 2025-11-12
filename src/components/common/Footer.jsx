import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LINE_OFFICIAL_URL = 'https://line.me/R/ti/p/@beautypowder';

export function Footer() {
  return (
    <footer className="bg-white border-t border-rose-200 text-gray-500 text-center py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">会社情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-rose-700 transition-colors">
                  会社概要
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-rose-700 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-rose-700 transition-colors">
                  利用規約
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">サポート</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-rose-700 transition-colors">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-rose-700 transition-colors">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-rose-700 transition-colors">
                  配送について
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">フォローする</h3>
            <div className="flex justify-center space-x-4">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-green-500 transition-colors"
                aria-label="LINE"
              >
                <FontAwesomeIcon icon={['fab', 'line']} />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={['fab', 'instagram']} />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={['fab', 'twitter']} />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={['fab', 'facebook']} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-100 pt-6">
          <p className="text-sm">
            © {new Date().getFullYear()} ADAGIO LAB - CareMé Beauty. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-400">
            美しさと健康を追求する、あなたのためのビューティーパウダー
          </p>
        </div>
      </div>
    </footer>
  );
}
