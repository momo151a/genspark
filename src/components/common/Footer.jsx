import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LINE_OFFICIAL_URL = 'https://line.me/R/ti/p/@beautypowder';

export function Footer() {
  return (
    <footer className="bg-white border-t border-rose-200 text-gray-500 text-center py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="pt-6">
          <div className="mb-4">
            <h3
              className="text-lg font-semibold mb-1"
              style={{ color: "#d4838f", fontFamily: "Georgia, serif" }}
            >
              CareMé
            </h3>
            <p className="text-xs text-gray-400">
              美と健康をサポートする製品をお届けします
            </p>
          </div>
          <p className="text-sm mb-3">
            © {new Date().getFullYear()} CareMé. All rights reserved.
          </p>
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-green-500 hover:text-green-600 transition"
          >
            <FontAwesomeIcon icon={["fab", "line"]} className="text-xl" />
            <span className="text-sm font-medium">公式LINE@beautypowder</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
