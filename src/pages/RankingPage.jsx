import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const LINE_OFFICIAL_URL = "https://line.me/R/ti/p/@beautypowder";

// ランキングデータ
const RANKING_DATA = {
  sales: [
    { rank: 1, name: "ビューティーパウダー", price: 3980, sales: "1234", image: null },
    { rank: 2, name: "ワコナルビューティー", price: 4980, sales: "987", image: null },
    { rank: 3, name: "リミエローション", price: 2980, sales: "759", image: null },
    { rank: 4, name: "ヒカリノシオ", price: 1980, sales: "645", image: null },
    { rank: 5, name: "プラセンタクリーム", price: 5980, sales: "532", image: null },
  ],
  repeat: [
    { rank: 1, name: "ビューティーパウダー", price: 3980, rate: "85%", image: null },
    { rank: 2, name: "ヒカリノシオ", price: 1980, rate: "83%", image: null },
    { rank: 3, name: "梓のあな甘茶", price: 2480, rate: "81%", image: null },
    { rank: 4, name: "リミエローション", price: 2980, rate: "78%", image: null },
    { rank: 5, name: "リミエクレンジング", price: 3480, rate: "75%", image: null },
  ],
  skincare: [
    { rank: 1, name: "リミエローション", price: 2980, rating: 4.8, image: null },
    { rank: 2, name: "プラセンタクリーム", price: 5980, rating: 4.7, image: null },
    { rank: 3, name: "リミエクレンジング", price: 3480, rating: 4.6, image: null },
    { rank: 4, name: "ビューティーパウダー", price: 3980, rating: 4.5, image: null },
    { rank: 5, name: "ヒカリノシオ", price: 1980, rating: 4.4, image: null },
  ],
};

// ランキングアイテムカードコンポーネント
function RankingCard({ item, type }) {
  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div className="absolute -top-2 -left-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-md z-10">
          <FontAwesomeIcon icon="crown" className="text-white text-base" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="absolute -top-2 -left-2 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center shadow-md z-10">
          <FontAwesomeIcon icon="medal" className="text-white text-base" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="absolute -top-2 -left-2 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-md z-10">
          <FontAwesomeIcon icon="medal" className="text-white text-base" />
        </div>
      );
    } else if (rank === 4 || rank === 5) {
      return (
        <div className="absolute -top-2 -left-2 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center shadow-md z-10">
          <span className="text-white font-bold text-sm">{rank}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-shrink-0 w-48 sm:w-full bg-white rounded-xl shadow-md p-4 border border-rose-100 relative hover:shadow-lg transition-all duration-300">
      {getRankBadge(item.rank)}
      <div className="flex flex-col items-center h-full">
        {/* 商品画像プレースホルダー */}
        <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white"></div>
          )}
        </div>
        {/* 商品名 */}
        <h4 className="text-sm font-semibold text-gray-800 mb-2 text-center line-clamp-2 min-h-[2.5rem]">
          {item.name}
        </h4>
        {/* ランキングタイプ別の情報 */}
        <div className="mb-2 min-h-[1.25rem] text-center">
          {type === "sales" && (
            <p className="text-xs text-gray-600">販売数: {item.sales}</p>
          )}
          {type === "repeat" && (
            <p className="text-xs text-gray-600">リピート率: {item.rate}</p>
          )}
          {type === "skincare" && (
            <div className="flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon="star"
                  className={`text-xs ${
                    i < Math.floor(item.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-600 ml-1">{item.rating}</span>
            </div>
          )}
        </div>
        {/* 価格 */}
        <p
          className="text-base font-bold mt-auto"
          style={{ color: "#d4838f" }}
        >
          ¥{item.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export function RankingPage() {
  // スクロールアニメーション用のrefと状態
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [salesRef, salesVisible] = useScrollAnimation({ threshold: 0.2 });
  const [repeatRef, repeatVisible] = useScrollAnimation({ threshold: 0.2 });
  const [skincareRef, skincareVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <main className="min-h-screen pt-24 sm:pt-28 bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4">
        {/* パンくずナビゲーション */}
        <nav className="pt-8 sm:pt-8 pb-4 mb-4 text-sm mt-0 md:mt-8">
          <Link
            to="/"
            className="text-gray-600 hover:text-rose-600 transition-colors"
          >
            ホーム
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">ランキング</span>
        </nav>

        {/* ページタイトル */}
        <div
          ref={titleRef}
          className={`text-center mb-12 scroll-fade-in-up ${titleVisible ? "visible" : ""}`}
        >
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon="trophy"
              className="text-4xl mr-3"
              style={{ color: "#fbbf24" }}
            />
            <h1
              className="text-3xl sm:text-4xl font-semibold"
              style={{ color: "#d4838f", fontFamily: "Georgia, serif" }}
            >
              CareMé ランキング
            </h1>
          </div>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: "#ffb5ba" }}
          ></div>
        </div>

        {/* 売れ筋ランキング */}
        <section
          ref={salesRef}
          className={`mb-16 scroll-fade-in-up ${salesVisible ? "visible" : ""}`}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <FontAwesomeIcon
                icon="fire"
                className="text-red-500 text-xl"
              />
            </div>
            <h2
              className="text-2xl font-semibold"
              style={{ color: "#d4838f" }}
            >
              売れ筋ランキング
            </h2>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:overflow-visible sm:mx-0 sm:px-0">
            <div className="flex gap-4 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-6">
              {RANKING_DATA.sales.map((item) => (
                <RankingCard key={item.rank} item={item} type="sales" />
              ))}
            </div>
          </div>
        </section>

        {/* リピートランキング */}
        <section
          ref={repeatRef}
          className={`mb-16 scroll-fade-in-up ${repeatVisible ? "visible" : ""}`}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <FontAwesomeIcon
                icon="redo"
                className="text-blue-500 text-xl"
              />
            </div>
            <h2
              className="text-2xl font-semibold"
              style={{ color: "#d4838f" }}
            >
              リピートランキング
            </h2>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:overflow-visible sm:mx-0 sm:px-0">
            <div className="flex gap-4 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-6">
              {RANKING_DATA.repeat.map((item) => (
                <RankingCard key={item.rank} item={item} type="repeat" />
              ))}
            </div>
          </div>
        </section>

        {/* スキンケア人気ランキング */}
        <section
          ref={skincareRef}
          className={`mb-16 scroll-fade-in-up ${skincareVisible ? "visible" : ""}`}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-3">
              <FontAwesomeIcon
                icon="heart"
                className="text-pink-500 text-xl"
              />
            </div>
            <h2
              className="text-2xl font-semibold"
              style={{ color: "#d4838f" }}
            >
              スキンケア人気ランキング
            </h2>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:overflow-visible sm:mx-0 sm:px-0">
            <div className="flex gap-4 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-6">
              {RANKING_DATA.skincare.map((item) => (
                <RankingCard key={item.rank} item={item} type="skincare" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
