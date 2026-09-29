import { useState } from "react";

function RecommendedProducts({ products }) {
  // 추천상품 찜 상태
  const [likedProducts, setLikedProducts] = useState([]);

  const handleProductClick = (productId) => {
    /*
      추후 상품 상세 페이지 라우팅이 확정되면
      productId를 이용해 이동 기능을 연결합니다.

      예:
      navigate(`/product/${productId}`);

      현재는 App.jsx / Router 등
      공통 파일을 수정하지 않습니다.
    */
  };

  const handleLike = (event, productId) => {
    event.stopPropagation();

    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="cart-recommend">
      <div className="cart-recommend__header">
        <h2>같이 데려가면 좋은 친구들</h2>

        <button
          type="button"
          className="cart-recommend__more"
        >
          전체보기
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="cart-recommend__grid">
        {products.map((product) => {
          const isLiked = likedProducts.includes(product.id);

          return (
            <article
              key={product.id}
              className="cart-recommend-card"
              onClick={() => handleProductClick(product.id)}
            >
              <button
                type="button"
                className="cart-recommend-card__image-button"
                onClick={() => handleProductClick(product.id)}
                aria-label={`${product.name} 상품 보기`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-recommend-card__image"
                />
              </button>

              <div className="cart-recommend-card__bottom">
                <div className="cart-recommend-card__info">
                  <h3>{product.name}</h3>

                  <strong>
                    {product.price.toLocaleString()}원
                  </strong>
                </div>

                <button
                  type="button"
                  className="cart-recommend-card__like"
                  onClick={(event) =>
                    handleLike(event, product.id)
                  }
                  aria-label={
                    isLiked
                      ? `${product.name} 찜 해제`
                      : `${product.name} 찜하기`
                  }
                  aria-pressed={isLiked}
                >
                  <img
                    src={
                      isLiked
                        ? "/images/cart/hearton.svg"
                        : "/images/cart/heartoff.svg"
                    }
                    alt=""
                  />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RecommendedProducts;