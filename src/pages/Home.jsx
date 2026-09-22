
import {
  MainVisual,
  CategorySection,
  ProductSection,
  CommunityPreview,
  PromotionBanner,
} from "../components/home/HomeSections";

import {
  newProducts,
  bestProducts,
} from "../data/homeData";

import "../styles/home.css";

function Home() {
  return (
    <main className="home">
      {/* 메인 비주얼 */}
      <MainVisual />

      {/* 1168px 콘텐츠 영역 */}
      <div className="home-inner">

        {/* 캐릭터 카테고리 */}
        <CategorySection />

        {/* 신상품 */}
        <ProductSection
          title="NEW FRIENDS"
          products={newProducts}
        />

        {/* 인기 상품 */}
        <ProductSection
          title="BEST GOODS"
          products={bestProducts}
        />

        {/* 커뮤니티 */}
        <CommunityPreview />

        {/* 브랜드 스토리 */}
        <PromotionBanner />

      </div>
    </main>
  );
}

export default Home;