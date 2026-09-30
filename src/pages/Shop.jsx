import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Shop.css'
import { categories, products, characters } from '../data/ShopData'

function Shop() {
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [likedProducts, setLikedProducts] = useState([])

  const toggleLike = (productId) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const matchesCategory = (product) => {
    return (
      selectedCategory === 'all' ||
      product.categories.includes(selectedCategory)
    )
  }

  const goToProductDetail = (productId) => {
    navigate(`/shop/${productId}`)
  }

  // ShopData는 수정하지 않고
  // 추천 상품만 Shop.jsx 내부에서 지정
  const recommendedProductIds = [13, 15, 18, 19]

  return (
    <main className="shop-page">
      <div className="shop-inner">

        {/* MARKET INTRO */}
        <section className="shop-intro">
          <p className="shop-breadcrumb">MARKET</p>

          <h1 className="shop-title">
            MARKET
          </h1>

          <p className="shop-subtitle">
            오늘 데려갈 친구를 찾아보세요.
          </p>
        </section>

        {/* MARKET MAIN BANNER */}
        <section className="shop-hero">
          <img
            src="/images/shop/market-main.png"
            alt="HAJJAN 마켓 메인 배너"
          />
        </section>

        {/* CATEGORY */}
        <section className="shop-category">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={
                selectedCategory === category.id ? 'active' : ''
              }
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </section>

        {/* JUST ARRIVED */}
        <section className="shop-section">

          <div className="shop-section-header">
            <div className="shop-section-title-wrap">
              <h2>JUST ARRIVED</h2>
              <p>새로 온 하찮은 상품</p>
            </div>

            <button
              type="button"
              className="shop-more"
              onClick={() => navigate('/shop/best-new?tab=new')}
            >
              더보기 ›
            </button>
          </div>

          <div className="shop-product-grid">
            {products
              .filter(
                (product) =>
                  product.isNew &&
                  matchesCategory(product)
              )
              .slice(0, 4)
              .map((product) => (
                <article
                  className="shop-product-card"
                  key={product.id}
                  onClick={() => goToProductDetail(product.id)}
                >

                  <div className="shop-product-image-wrap">

                    <span className="shop-new-badge">
                      NEW
                    </span>

                    <img
                      src={product.mainImage}
                      alt={product.name}
                    />

                  </div>

                  <div className="shop-product-info">

                    <div>
                      <p>{product.name}</p>

                      <strong>
                        {product.price.toLocaleString()}원
                      </strong>
                    </div>

                    <button
                      type="button"
                      className={`shop-heart ${
                        likedProducts.includes(product.id)
                          ? 'active'
                          : ''
                      }`}
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleLike(product.id)
                      }}
                      aria-label={`${product.name} 찜하기`}
                    >
                      {likedProducts.includes(product.id)
                        ? '♥'
                        : '♡'}
                    </button>

                  </div>

                </article>
              ))}
          </div>

        </section>

        {/* BEST FRIENDS */}
        <section className="shop-section">

          <div className="shop-section-header">
            <div className="shop-section-title-wrap">
              <h2>BEST FRIENDS</h2>
            </div>

            <button
              type="button"
              className="shop-more"
              onClick={() => navigate('/shop/best-new?tab=best')}
            >
              더보기 ›
            </button>
          </div>

          <div className="shop-product-grid">
            {products
              .filter(
                (product) =>
                  product.isBest &&
                  matchesCategory(product)
              )
              .slice(0, 4)
              .map((product, index) => (
                <article
                  className="shop-product-card"
                  key={product.id}
                  onClick={() => goToProductDetail(product.id)}
                >

                  <div className="shop-product-image-wrap">

                    <span className="shop-rank-badge">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <img
                      src={product.mainImage}
                      alt={product.name}
                    />

                  </div>

                  <div className="shop-product-info">

                    <div>
                      <p>{product.name}</p>

                      <strong>
                        {product.price.toLocaleString()}원
                      </strong>
                    </div>

                    <button
                      type="button"
                      className={`shop-heart ${
                        likedProducts.includes(product.id)
                          ? 'active'
                          : ''
                      }`}
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleLike(product.id)
                      }}
                      aria-label={`${product.name} 찜하기`}
                    >
                      {likedProducts.includes(product.id)
                        ? '♥'
                        : '♡'}
                    </button>

                  </div>

                </article>
              ))}
          </div>

        </section>

        {/* SHOP BY CHARACTER */}
        <section className="shop-section">

          <div className="shop-section-header">
            <div className="shop-section-title-wrap">
              <h2>SHOP BY CHARACTER</h2>
            </div>
          </div>

          <div className="shop-character-list">
            {characters.map((character) => (
              <button
                type="button"
                className="shop-character"
                key={character.id}
                onClick={() =>
                  navigate(`/shop/products?character=${character.id}`)
                }
              >
                <div className="shop-character-image">
                  <img
                    src={character.image}
                    alt={character.name}
                  />
                </div>

                <span>{character.name}</span>
              </button>
            ))}
          </div>

        </section>

        {/* PROMOTION BANNER */}
        <section className="shop-promotion">
          <img
            src="/images/shop/promotion.png"
            alt="HAJJAN 프로모션 배너"
          />
        </section>

        {/* RECOMMENDED FOR YOU */}
        <section className="shop-section">

          <div className="shop-section-header">

            <div className="shop-section-title-wrap">
              <h2>RECOMMENDED FOR YOU</h2>
            </div>

            <button
              type="button"
              className="shop-more"
              onClick={() => navigate('/shop/products')}
            >
              더보기 ›
            </button>

          </div>

          <div className="shop-product-grid">
            {products
              .filter(
                (product) =>
                  recommendedProductIds.includes(product.id) &&
                  matchesCategory(product)
              )
              .map((product) => (
                <article
                  className="shop-product-card"
                  key={product.id}
                  onClick={() => goToProductDetail(product.id)}
                >

                  <div className="shop-product-image-wrap">

                    <img
                      src={product.mainImage}
                      alt={product.name}
                    />

                  </div>

                  <div className="shop-product-info">

                    <div>
                      <p>{product.name}</p>

                      <strong>
                        {product.price.toLocaleString()}원
                      </strong>
                    </div>

                    <button
                      type="button"
                      className={`shop-heart ${
                        likedProducts.includes(product.id)
                          ? 'active'
                          : ''
                      }`}
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleLike(product.id)
                      }}
                      aria-label={`${product.name} 찜하기`}
                    >
                      {likedProducts.includes(product.id)
                        ? '♥'
                        : '♡'}
                    </button>

                  </div>

                </article>
              ))}
          </div>

        </section>

      </div>
    </main>
  )
}

export default Shop