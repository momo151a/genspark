import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "../components/common/Carousel";
import { useAuth } from "../contexts/AuthContext";

const LINE_OFFICIAL_URL = "https://line.me/R/ti/p/@beautypowder";

const CATEGORIES = [
  { value: "", label: "すべてのカテゴリー" },
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
    description: "公式LINEアカウントを友だちに追加",
  },
  {
    step: 2,
    title: "商品選択",
    description: "メニューから希望の商品を選択",
  },
  {
    step: 3,
    title: "クーポン適用",
    description: "友だち限定15%OFFクーポン自動適用",
  },
  {
    step: 4,
    title: "購入完了",
    description: "決済完了後、2-3営業日でお届け",
  },
];

export function HomePage() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const { currentUser } = useAuth();

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
      <section className="relative overflow-hidden py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-3xl sm:text-5xl font-light mb-6"
              style={{ color: "#d4838f", fontFamily: "Georgia, serif" }}
            >
              あなたの美しさを引き出す
              <br className="sm:hidden" />
              <span className="text-2xl sm:text-4xl">ビューティーパウダー</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
              CareMéの厳選された美容成分で、内側から輝く美しさを。
              <br />
              お客様の声を集めた、信頼できる口コミサイト
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleReviewButtonClick}
                className="px-8 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 btn-primary"
              >
                <FontAwesomeIcon icon="pen" className="mr-2" />
                レビューを書く
              </button>
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 btn-line"
              >
                <FontAwesomeIcon icon={["fab", "line"]} className="mr-2" />
                LINE友だち限定15%OFF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      <Carousel title="人気商品" />

      {/* Reviews Section */}
      <section className="py-12">
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
              お客様の声
            </h2>
            <div
              className="w-24 h-1 mx-auto"
              style={{
                background: "linear-gradient(to right, #ffe4e1, #ffb5ba)",
              }}
            ></div>
          </div>

          {/* Filter and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <select
                value={categoryFilter}
                onChange={handleCategoryChange}
                className="px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 text-gray-700"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">並び替え:</span>
              <div className="flex rounded-lg overflow-hidden border border-rose-200">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      sortBy === option.value
                        ? "bg-rose-100 text-rose-700"
                        : "bg-white text-gray-600 hover:bg-rose-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
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

      {/* Purchase Flow Section */}
      <section className="py-12 bg-gradient-to-br from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-light mb-4"
              style={{ color: "#d4838f", fontFamily: "Georgia, serif" }}
            >
              <FontAwesomeIcon
                icon="shopping-cart"
                className="mr-3"
                style={{ color: "#ffb5ba" }}
              />
              ご購入までの流れ
            </h2>
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
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center btn-line">
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
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: index === 0 ? "#d4838f" : "#ffe4e1",
                  }}
                  aria-label={`Step ${step.step}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
