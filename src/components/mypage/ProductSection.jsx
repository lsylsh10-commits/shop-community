import { recentProducts } from "../../data/mypage";

function ProductSection() {
  return (
    <section className="mypage-section">
      <div className="mypage-section__header">
        <h2>최근 구매 상품</h2>

        <button type="button" className="mypage-section__more">
          <span>전체보기</span>

          <img
            src="/images/mypage/next.svg"
            alt=""
            className="mypage-section__more-icon"
          />
        </button>
      </div>

      <div className="mypage-products">
        {recentProducts.map((product) => (
          <article key={product.id} className="mypage-product-card">
            <div className="mypage-product-card__image">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="mypage-product-card__info">
              <h3>{product.name}</h3>
              <strong>{product.price.toLocaleString()}원</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductSection;