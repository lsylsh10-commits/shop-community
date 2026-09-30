import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/ShopData'
import '../styles/BestNew.css'

function BestNew() {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialTab =
    searchParams.get('tab') === 'new' ? 'new' : 'best'

  const [selectedTab, setSelectedTab] = useState(initialTab)
  const [likedProducts, setLikedProducts] = useState([])

  const bestProducts = products.filter(
    (product) => product.section === 'best'
  )

  const newProducts = products.filter(
    (product) => product.section === 'new'
  )

  const toggleLike = (productId) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const handleTabClick = (tab) => {
    setSelectedTab(tab)
    setSearchParams({ tab })

    const target = document.getElementById(
      tab === 'best' ? 'best-section' : 'new-section'
    )

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const renderHeart = (product) => {
    const isLiked = likedProducts.includes(product.id)

    return (
      <button
        type="button"
        className={`best-new-heart ${
          isLiked ? 'is-liked' : ''
        }`}
        onClick={() => toggleLike(product.id)}
        aria-label={`${product.name} 찜하기`}
        aria-pressed={isLiked}
      >
        {isLiked ? '♥' : '♡'}
      </button>
    )
  }

  return (
    <main className="best-new-page">
      <div className="best-new-inner">

        {/* INTRO */}
        <section className="best-new-intro">
<div className="best-new-breadcrumb">
  <span>MARKET</span>

  <img
    src="/images/shop/icons/breadcrumb-arrow.svg"
    alt=""
    className="best-new-breadcrumb-icon"
  />

  <span>BEST & NEW</span>
</div>
          <h1 className="best-new-title">
            지금 많이 데려가는 친구들
          </h1>

          <p className="best-new-subtitle">
            새로 온 하찮은 것들도 함께 만나보세요.
          </p>
        </section>


        {/* BANNER */}
        <section className="best-new-banner">
          <img
            src="/images/shop/all-goods-banner.png"
            alt="BEST & NEW 배너"
          />
        </section>


        {/* BEST / NEW */}
        <section className="best-new-tabs">
          <button
            type="button"
            className={
              selectedTab === 'best' ? 'active' : ''
            }
            onClick={() => handleTabClick('best')}
          >
            BEST
          </button>

          <button
            type="button"
            className={
              selectedTab === 'new' ? 'active' : ''
            }
            onClick={() => handleTabClick('new')}
          >
            NEW
          </button>
        </section>


        {/* BEST */}
        <section
          className="best-new-section"
          id="best-section"
        >
          <div className="best-new-section-header">
            <h2>BEST</h2>
            <p>요즘 자꾸 데려가는 친구들</p>
          </div>

          <div className="best-products-grid">
            {bestProducts.map((product, index) => (
              <article
                className="best-new-card"
                key={product.id}
              >
                <div className="best-new-image">
                  <span className="best-new-rank">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="best-new-info">
                  <div>
                    <p className="best-new-name">
                      {product.name}
                    </p>

                    <strong className="best-new-price">
                      {product.price.toLocaleString()}원
                    </strong>
                  </div>

                  {renderHeart(product)}
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* NEW */}
        <section
          className="best-new-section"
          id="new-section"
        >
          <div className="best-new-section-row">
            <div className="best-new-section-header">
              <h2>NEW</h2>
              <p>새로 온 하찮은 것들</p>
            </div>

            <div className="best-new-controls">
              <select
                className="best-new-sort"
                defaultValue="newest"
              >
                <option value="newest">최신순</option>
                <option value="recommended">추천순</option>
                <option value="lowPrice">낮은순</option>
                <option value="highPrice">높은순</option>
              </select>

              <button
                type="button"
                className="best-new-filter"
              >
                <span>☷</span>
                필터
              </button>
            </div>
          </div>


          <div className="new-products-grid">
            {newProducts.map((product) => (
              <article
                className="best-new-card"
                key={product.id}
              >
                <div className="best-new-image">
                  <span className="best-new-badge">
                    NEW
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="best-new-info">
                  <div>
                    <p className="best-new-name">
                      {product.name}
                    </p>

                    <strong className="best-new-price">
                      {product.price.toLocaleString()}원
                    </strong>
                  </div>

                  {renderHeart(product)}
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}

export default BestNew