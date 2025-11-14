import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "../components/common/Carousel";
import { useAuth } from "../contexts/AuthContext";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const LINE_OFFICIAL_URL = "https://line.me/R/ti/p/@beautypowder";

const CATEGORIES = [
  { value: "", label: "すべて" },
  { value: "1", label: "ビューティーパウダー" },
  { value: "2", label: "ワコナルビューティ" },
  { value: "3", label: "ヒカリシリーズ" },
  { value: "4", label: "クレンジング" },
  { value: "5", label: "化粧水" },
];

const SORT_OPTIONS = [
  { value: "latest", label: "新着順" },
  { value: "popular", label: "人気順" },
  { value: "rating", label: "評価順" },
];

const PURCHASE_STEPS = [
  {
    step: 1,
    title: "LINE友だち追加",
    description: "公式LINEを友だち追加",
  },
  {
    step: 2,
    title: "URL購入",
    description: "LINE内のURLから購入",
  },
  {
    step: 3,
    title: "発送",
    description: "商品を迅速に発送",
  },
  {
    step: 4,
    title: "お届け",
    description: "ご自宅にお届け",
  },
];

// ランキングデータ
const RANKING_DATA = {
  sales: [
    { rank: 1, name: "ビューティーパウダー", price: 3980, sales: "1234" },
    { rank: 2, name: "ワコナルビューティー", price: 4980, sales: "987" },
    { rank: 3, name: "リミエローション", price: 2980, sales: "759" },
  ],
  repeat: [
    { rank: 1, name: "ビューティーパウダー", price: 3980, rate: "85%" },
    { rank: 2, name: "ヒカリノシオ", price: 1980, rate: "83%" },
    { rank: 3, name: "梓のあな甘茶", price: 2480, rate: "81%" },
  ],
  skincare: [
    { rank: 1, name: "リミエローション", price: 2980, rating: 5.0 },
    { rank: 2, name: "プラセンタクリーム", price: 5980, rating: 4.7 },
    { rank: 3, name: "リミエクレンジング", price: 3480, rating: 4.8 },
  ],
};

export function HomePage() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const { currentUser } = useAuth();

  // スクロールアニメーション用のrefと状態
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [productsRef, productsVisible] = useScrollAnimation({ threshold: 0.2 });
  const [reviewsRef, reviewsVisible] = useScrollAnimation({ threshold: 0.2 });
  const [rankingRef, rankingVisible] = useScrollAnimation({ threshold: 0.2 });
  const [purchaseRef, purchaseVisible] = useScrollAnimation({ threshold: 0.2 });

  // 統計データ（実際のデータに置き換える必要があります）
  const stats = {
    reviewCount: 6,
    userCount: "150+",
    averageRating: 4.5,
  };

  const handleReviewButtonClick = () => {
    if (currentUser) {
      // TODO: Show review form modal
      console.log("Show review form");
    } else {
      window.location.href = "/login";
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    // TODO: Fetch and filter reviews
    console.log("Filter by category:", e.target.value);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    // TODO: Sort reviews
    console.log("Sort by:", sort);
  };

  const handleLoadMore = () => {
    // TODO: Load more reviews
    console.log("Load more reviews");
  };

  return (
    <main className="min-h-screen pt-24 sm:pt-28 bg-mistyrose-gradient">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative overflow-hidden py-12 sm:py-20 border-b border-rose-100 scroll-fade-in-up ${
          heroVisible ? "visible" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4">
              <p
                className="text-sm uppercase tracking-widest mb-2"
                style={{ color: "#ffb5ba", fontFamily: "Georgia, serif" }}
              >
                CAREMÉ PRESENTS
              </p>
              <h1
                className="text-3xl sm:text-5xl font-light mb-4"
                style={{ color: "#d4838f", fontFamily: "Georgia, serif" }}
              >
                美しさは内側から、プロテインで輝く毎日を
              </h1>
            </div>
            <p className="text-gray-500 mb-8 text-sm sm:text-base">
              CareMéの製品口コミを参考に、あなたにぴったりの美容習慣を見つけましょう
            </p>

            <div className="mb-8">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-400 to-green-500 text-white px-8 py-4 rounded-full hover:from-green-500 hover:to-green-600 transition font-medium text-lg shadow-lg transform hover:scale-105"
              >
                <FontAwesomeIcon icon={["fab", "line"]} className="text-2xl" />
                <span>公式LINEで購入する</span>
              </a>
              <p className="text-xs text-gray-500 mt-3">
                友だち追加で限定クーポンGET!
              </p>
            </div>

            {/* Statistics Boxes */}
            <div className="flex justify-center gap-6">
              <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-rose-200">
                <FontAwesomeIcon
                  icon="comments"
                  className="text-xl mb-2"
                  style={{ color: "#d4838f" }}
                />
                <p className="text-xs text-gray-500">口コミ数</p>
                <p className="text-xl font-light text-gray-700">
                  {stats.reviewCount}
                </p>
              </div>
              <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-rose-200">
                <FontAwesomeIcon
                  icon="users"
                  className="text-xl mb-2 text-neutral-300"
                />
                <p className="text-xs text-gray-500">ユーザー数</p>
                <p className="text-xl font-light text-gray-700">
                  {stats.userCount}
                </p>
              </div>
              <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-rose-200">
                <FontAwesomeIcon
                  icon="star"
                  className="text-xl mb-2 text-orange-300"
                />
                <p className="text-xs text-gray-500">平均評価</p>
                <p className="text-xl font-light text-gray-700">
                  {stats.averageRating}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CareMé Products Section */}
      <section
        ref={productsRef}
        className={`py-12 bg-white border-b border-rose-100 scroll-fade-in-up ${
          productsVisible ? "visible" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl font-semibold mb-3"
              style={{ color: "#d4838f", fontFamily: "Georgia, serif" }}
            >
              CareMé Products
            </h2>
            <p className="text-gray-600">美と健康をサポートする製品ラインナップ</p>
            <div
              className="w-24 h-1 mx-auto mt-4"
              style={{
                background: "linear-gradient(to right, #ffe4e1, #ffb5ba)",
              }}
            ></div>
          </div>
          <Carousel title="" />
          <div className="mt-8 text-center">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-full text-white font-medium shadow-lg transform hover:scale-105 transition-all duration-300 btn-line"
            >
              <FontAwesomeIcon icon={["fab", "line"]} className="text-2xl" />
              <span>全商品のお問い合わせはLINEから</span>
            </a>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section
        ref={reviewsRef}
        className={`py-12 bg-gradient-to-b from-white to-rose-50 border-b border-rose-100 scroll-fade-in-up ${
          reviewsVisible ? "visible" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-light mb-4"
              style={{ color: "#d4838f", fontFamily: "Georgia, serif" }}
            >
              <FontAwesomeIcon
                icon="comments"
                className="mr-3"
                style={{ color: "#ffb5ba" }}
              />
              Customer Reviews
            </h2>
            <p className="text-gray-600 mb-4">お客様からいただいた口コミ</p>
            <div
              className="w-24 h-1 mx-auto"
              style={{
                background: "linear-gradient(to right, #ffe4e1, #ffb5ba)",
              }}
            ></div>
          </div>

          {/* Filter and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategoryFilter(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    categoryFilter === cat.value
                      ? "bg-rose-400 text-white"
                      : "bg-white text-gray-600 hover:bg-rose-50 border border-rose-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">並び替え:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 text-gray-700"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reviews Grid - Placeholder */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Reviews will be loaded here from Firebase */}
            <div className="col-span-full text-center py-12 text-gray-500">
              レビューを読み込み中...
            </div>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-full border-2 border-rose-300 text-rose-700 font-medium hover:bg-rose-50 transition-all duration-300"
            >
              もっと見る
            </button>
          </div>
        </div>
      </section>

      {/* Popular Ranking Section */}
      <section
        ref={rankingRef}
        className={`py-12 bg-white border-t border-rose-100 scroll-fade-in-up ${
          rankingVisible ? "visible" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-light mb-4"
              style={{ color: "#d4838f", fontFamily: "Georgia, serif" }}
            >
              人気ランキング
            </h2>
            <p className="text-gray-600 mb-4">今最も選ばれている商品をチェック</p>
            <div
              className="w-24 h-1 mx-auto"
              style={{
                background: "linear-gradient(to right, #ffe4e1, #ffb5ba)",
              }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* 売れ筋TOP3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <FontAwesomeIcon
                    icon="fire"
                    className="text-orange-500 text-xl"
                  />
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#d4838f" }}
                >
                  売れ筋TOP3
                </h3>
              </div>
              <div className="space-y-3">
                {RANKING_DATA.sales.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center justify-between p-3 bg-rose-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="text-rose-700 font-bold mr-2">
                        {item.rank}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          売上: {item.sales}
                        </p>
                      </div>
                    </div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "#d4838f" }}
                    >
                      ¥{item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* リピートTOP3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FontAwesomeIcon
                    icon="redo"
                    className="text-blue-500 text-xl"
                  />
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#d4838f" }}
                >
                  リピートTOP3
                </h3>
              </div>
              <div className="space-y-3">
                {RANKING_DATA.repeat.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center justify-between p-3 bg-rose-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="text-rose-700 font-bold mr-2">
                        {item.rank}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          リピート率: {item.rate}
                        </p>
                      </div>
                    </div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "#d4838f" }}
                    >
                      ¥{item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* スキンケアTOP3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <FontAwesomeIcon
                    icon="heart"
                    className="text-pink-500 text-xl"
                  />
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#d4838f" }}
                >
                  スキンケアTOP3
                </h3>
              </div>
              <div className="space-y-3">
                {RANKING_DATA.skincare.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center justify-between p-3 bg-rose-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="text-rose-700 font-bold mr-2">
                        {item.rank}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.name}
                        </p>
                        <div className="flex items-center">
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
                          <span className="text-xs text-gray-500 ml-1">
                            {item.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "#d4838f" }}
                    >
                      ¥{item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="px-8 py-3 rounded-full text-white font-medium shadow-lg transform hover:scale-105 transition-all duration-300 btn-primary">
              すべてのランキングを見る
            </button>
          </div>
        </div>
      </section>

      {/* Purchase Flow Section */}
      <section
        ref={purchaseRef}
        className={`py-12 bg-gradient-to-br from-rose-50 to-white scroll-fade-in-up ${
          purchaseVisible ? "visible" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-light mb-4"
              style={{ color: "#d4838f", fontFamily: "Georgia, serif" }}
            >
              Purchase Flow
            </h2>
            <p className="text-gray-600 mb-4">ご購入までの流れ</p>
            <div
              className="w-24 h-1 mx-auto"
              style={{
                background: "linear-gradient(to right, #ffe4e1, #ffb5ba)",
              }}
            ></div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Horizontal Scroll - All Screen Sizes */}
            <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="flex">
                {PURCHASE_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="flex-shrink-0 w-[80vw] sm:w-1/4 snap-center px-2"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center h-full">
                      <div
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #4ade80, #22c55e)",
                        }}
                      >
                        <span className="text-white text-2xl font-bold">
                          {step.step}
                        </span>
                      </div>
                      <h3
                        className="font-medium text-lg mb-2"
                        style={{ color: "#d4838f" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Dots */}
            <div className="flex justify-center mt-4 space-x-2 sm:hidden">
              {PURCHASE_STEPS.map((step, index) => (
                <button
                  key={step.step}
                  className="w-2 h-2 rounded-full purchase-dot"
                  style={{
                    backgroundColor: index === 0 ? "#d4838f" : "#ffe4e1",
                  }}
                  aria-label={`Step ${step.step}`}
                />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-full text-white font-medium shadow-lg transform hover:scale-105 transition-all duration-300 btn-line"
            >
              <FontAwesomeIcon icon={["fab", "line"]} className="text-2xl" />
              <span>今すぐLINEで購入を始める</span>
            </a>
            <p className="text-xs text-gray-500 mt-3">
              初回購入15%OFFクーポン配布中!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
