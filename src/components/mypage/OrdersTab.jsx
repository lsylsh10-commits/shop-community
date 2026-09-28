import { recentProducts } from "../../data/mypage";

function OrdersTab() {
  return (
    <section className="mypage-tab-content">
      <h1>구매 내역</h1>

      <div className="mypage-tab-products">
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

export default OrdersTab;