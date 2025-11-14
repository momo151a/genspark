import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const LINE_OFFICIAL_URL = "https://line.me/R/ti/p/@beautypowder";

// サロンメニューアイテム
const SALON_MENU_ITEMS = [
  {
    id: "facial",
    title: "フェイシャルケア",
    description: "お肌の状態に合わせたオーダーメイドトリートメント",
  },
  {
    id: "body",
    title: "ボディケア",
    description: "リラックス効果と美肌効果を兼ね備えたスペシャルケア",
  },
  {
    id: "inner",
    title: "インナーケア",
    description: "美容サプリメントのカウンセリングと提案",
  },
  {
    id: "counseling",
    title: "カウンセリング",
    description: "美と健康に関するお悩み相談",
  },
];

export function SalonPage() {
  // スクロールアニメーション用のrefと状態
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [conceptRef, conceptVisible] = useScrollAnimation({ threshold: 0.2 });
  const [menuRef, menuVisible] = useScrollAnimation({ threshold: 0.2 });
  const [accessRef, accessVisible] = useScrollAnimation({ threshold: 0.2 });
  const [buttonRef, buttonVisible] = useScrollAnimation({ threshold: 0.2 });

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
          <span className="text-gray-700">サロン紹介</span>
        </nav>

        {/* メインコンテンツエリア */}
        <div
          ref={titleRef}
          className={`max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-10 mb-8 scroll-fade-in-up ${
            titleVisible ? "visible" : ""
          }`}
          style={{ boxShadow: "0 4px 20px rgba(255, 181, 186, 0.2)" }}
        >
          {/* タイトル */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl sm:text-4xl font-semibold mb-3"
              style={{ color: "#ffb5ba", fontFamily: "Georgia, serif" }}
            >
              CareMé Salon
            </h1>
            <div
              className="w-24 h-1 mx-auto"
              style={{ backgroundColor: "#ffb5ba" }}
            ></div>
          </div>

          {/* サロンコンセプト */}
          <section
            ref={conceptRef}
            className={`mb-10 scroll-fade-in-up ${
              conceptVisible ? "visible" : ""
            }`}
          >
            <div className="flex items-center mb-4">
              <FontAwesomeIcon
                icon="leaf"
                className="text-xl mr-3"
                style={{ color: "#ffb5ba" }}
              />
              <h2
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: "#ffb5ba" }}
              >
                サロンコンセプト
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              サロンでたくさんのお客様とお肌に向き合う中で、実感しているのは—本当の意味でお悩みを改善するには、サロンケアだけではなく、日々の生活や「食」の積み重ねがとても大切ということです。
              私たちが直接お手伝いできるのは月に一度。残りの29日は、お客様ご自身のホームケアや食事・生活習慣がカギになります。
              そんな中、私自身が大きく考え方を変えるきっかけになったのが「食」でした。
              身近な人のうつ病をきっかけに「私にできることは何だろう」と考え、たどり着いたのが“食のサポート”です。身体に取り入れるものを見直すことで、心も体も確実に変わる——そう実感してからは、添加物や食事内容に目を向け、学びを深めてきました。
              そこからは、お肌だけを見るのではなく、内側からのサポートにも力を入れるようになり、日々の経験と知識を活かして商品や口コミを発信しています。
              このサイトに掲載している声は、私が一方的に評価したものではなく、実際に商品を気に入って愛用してくださっているお客様のリアルな声です。
              せっかく使うなら、心と身体がよろこぶものを、長く心地よく続けてほしいーそんな想いを込めて、ひとつひとつ丁寧にご紹介しています。
            </p>
          </section>

          {/* サロンメニュー */}
          <section
            ref={menuRef}
            className={`mb-10 scroll-fade-in-up ${
              menuVisible ? "visible" : ""
            }`}
          >
            <div className="flex items-center mb-6">
              <FontAwesomeIcon
                icon="bars"
                className="text-xl mr-3"
                style={{ color: "#ffb5ba" }}
              />
              <h2
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: "#ffb5ba" }}
              >
                サロンメニュー
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SALON_MENU_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border-2 transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: "#fff5f3",
                    borderColor: "#ffe4e1",
                  }}
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "#d4838f" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* アクセス */}
          <section
            ref={accessRef}
            className={`mb-10 scroll-fade-in-up ${
              accessVisible ? "visible" : ""
            }`}
          >
            <div className="flex items-center mb-6">
              <FontAwesomeIcon
                icon="map-marker-alt"
                className="text-xl mr-3"
                style={{ color: "#ffb5ba" }}
              />
              <h2
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: "#ffb5ba" }}
              >
                アクセス
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <FontAwesomeIcon
                  icon="clock"
                  className="text-lg mr-3 mt-1"
                  style={{ color: "#d4838f" }}
                />
                <div>
                  <p className="text-sm sm:text-base">
                    営業時間: 10:00 - 20:00 (完全予約制)
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FontAwesomeIcon
                  icon="calendar"
                  className="text-lg mr-3 mt-1"
                  style={{ color: "#d4838f" }}
                />
                <div>
                  <p className="text-sm sm:text-base">定休日: 不定休</p>
                </div>
              </div>
              <div className="flex items-start">
                <FontAwesomeIcon
                  icon="phone"
                  className="text-lg mr-3 mt-1"
                  style={{ color: "#d4838f" }}
                />
                <div>
                  <p className="text-sm sm:text-base">
                    ご予約・お問い合わせ: LINE公式アカウントより
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* LINE予約ボタン */}
          <div
            ref={buttonRef}
            className={`text-center mb-6 scroll-fade-in-up ${
              buttonVisible ? "visible" : ""
            }`}
          >
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full text-white font-medium shadow-lg transform hover:scale-105 transition-all duration-300 btn-line w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={["fab", "line"]} className="text-2xl" />
              <span className="text-sm sm:text-base">
                サロンのご予約・お問い合わせはLINEから
              </span>
            </a>
            <p className="text-xs text-gray-500 mt-3">
              ※詳細な住所はご予約確定後にお伝えいたします
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
