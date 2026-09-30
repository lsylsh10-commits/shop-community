import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { products } from '../data/ShopData'

import '../styles/ProductList.css'

function ProductList() {
    const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('recommended')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState('all')

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCharacter = searchParams.get('character')

  
const characterOptions = [
  { id: 'all', label: '전체' },
  { id: 'popo', label: '포포' },
  { id: 'mungchi', label: '뭉치' },
  { id: 'jjagi', label: '짝이' },
  { id: 'bbangi', label: '빵이' },
  { id: 'bandi', label: '반디' },
  { id: 'giuni', label: '기운이' },
]


  const [isCharacterOpen, setIsCharacterOpen] = useState(
    Boolean(selectedCharacter)
  )

  const ITEMS_PER_PAGE = isCharacterOpen ? 8 : 20

  // 찜 상태
  const [likedProducts, setLikedProducts] = useState([])

  const handleToggleLike = (productId) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  // 카테고리
const handleCategoryClick = (category) => {
  setSelectedCategory(category)
  setIsCharacterOpen(false)
  setCurrentPage(1)
}
const handleCharacterClick = (characterId) => {
  if (characterId === 'all') {
    setSearchParams({})
  } else {
    setSearchParams({ character: characterId })
  }

  setCurrentPage(1)
}


  // 정렬
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value)
    setCurrentPage(1)
  }

  // 가격 필터
  const handlePriceFilter = (priceRange) => {
    setSelectedPrice(priceRange)
    setCurrentPage(1)
  }

  // 1. 카테고리 필터
let filteredProducts =
  selectedCategory === 'all'
    ? products
    : products.filter(
        (product) => product.categories?.includes(selectedCategory)
      )

// 캐릭터 필터
if (isCharacterOpen) {
  if (selectedCharacter) {
    // 포포, 뭉치 등 특정 캐릭터
    filteredProducts = filteredProducts.filter((product) =>
      product.characters?.includes(selectedCharacter)
    )
  } else {
    // CHARACTER의 '전체'
    filteredProducts = filteredProducts.filter(
      (product) =>
        Array.isArray(product.characters) &&
        product.characters.length > 0
    )
  }
}

  // 2. 가격대 필터
  if (selectedPrice === 'under10000') {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= 10000
    )
  }

  if (selectedPrice === '10000to20000') {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price > 10000 && product.price <= 20000
    )
  }

  if (selectedPrice === 'over20000') {
    filteredProducts = filteredProducts.filter(
      (product) => product.price > 20000
    )
  }

  // 3. 정렬
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === 'newest') return b.id - a.id
    if (selectedSort === 'popular') return (b.popularity || 0) - (a.popularity || 0)
    if (selectedSort === 'lowPrice') return a.price - b.price
    if (selectedSort === 'highPrice') return b.price - a.price
    return 0
  })

  // 4. 페이지네이션
  const totalPages = Math.ceil(
    sortedProducts.length / ITEMS_PER_PAGE
  )

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
    <main className="product-list-page">
      <div className="product-list-inner">

<section className="product-list-intro">
  <div className="product-list-breadcrumb">
    <span>MARKET</span>

    <img
      src="/images/shop/icons/breadcrumb-arrow.svg"
      alt=""
      className="product-list-breadcrumb-icon"
    />

    <span>
      {isCharacterOpen ? 'CHARACTER' : 'ALL GOODS'}
    </span>
  </div>

  <h1 className="product-list-title">
    {isCharacterOpen ? 'CHARACTER' : '전체 상품'}
  </h1>

  <p className="product-list-subtitle">
    {isCharacterOpen
      ? '작고 하찮은 친구를 일상으로 데려와요.'
      : '작고 하찮은 친구들을 한눈에 만나보세요.'}
  </p>
</section>


<section className="product-list-banner">
  <img
    src={
      isCharacterOpen
        ? '/images/shop/character-banner.png'
        : '/images/shop/all-goods-banner.png'
    }
    alt={
      isCharacterOpen
        ? '캐릭터 상품 배너'
        : '전체 상품 배너'
    }
  />
</section>

{isCharacterOpen ? (
 <section className="product-list-category product-list-character-category">
    {characterOptions.map((character) => (
      <button
        type="button"
        key={character.id}
        className={
          character.id === 'all'
            ? !selectedCharacter
              ? 'active'
              : ''
            : selectedCharacter === character.id
              ? 'active'
              : ''
        }
        onClick={() =>
          handleCharacterClick(character.id)
        }
      >
        {character.label}
      </button>
    ))}
  </section>
) : (
  <section className="product-list-category">

    <button
      type="button"
      className={
        selectedCategory === 'all'
          ? 'active'
          : ''
      }
      onClick={() =>
        handleCategoryClick('all')
      }
    >
      전체
    </button>

    <button
      type="button"
      onClick={() => {
        setIsCharacterOpen(true)
        setSelectedCategory('all')
        setCurrentPage(1)
      }}
    >
      캐릭터
    </button>

    <button
      type="button"
      className={
        selectedCategory === 'commute'
          ? 'active'
          : ''
      }
      onClick={() =>
        handleCategoryClick('commute')
      }
    >
      출근/등교
    </button>

    <button
      type="button"
      className={
        selectedCategory === 'life'
          ? 'active'
          : ''
      }
      onClick={() =>
        handleCategoryClick('life')
      }
    >
      생활
    </button>

    <button
      type="button"
      className={
        selectedCategory === 'desk'
          ? 'active'
          : ''
      }
      onClick={() =>
        handleCategoryClick('desk')
      }
    >
      데스크
    </button>

    <button
      type="button"
      className={
  selectedCategory === 'gift'
    ? 'active'
    : ''
}
onClick={() =>
  handleCategoryClick('gift')
}
    >
      소품
    </button>

  </section>
)}
        <div className="product-list-toolbar">
          <p className="product-list-count">
            상품 {filteredProducts.length}개
          </p>

          <div className="product-list-controls">
            <select
              className="product-list-sort"
              value={selectedSort}
              onChange={handleSortChange}
            >
         <option value="recommended">추천순</option>
<option value="newest">최신순</option>
<option value="popular">인기순</option>
<option value="lowPrice">낮은순</option>
<option value="highPrice">높은순</option>
</select>
            <button
              type="button"
              className={`product-list-filter ${
                selectedPrice !== 'all' ? 'active' : ''
              }`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <img
                src="/images/shop/icons/filter.svg"
                alt=""
                className="product-list-filter-icon"
              />
              <span>필터</span>
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="product-filter-panel">
            <p className="product-filter-title">
              가격대
            </p>

            <div className="product-filter-options">
              <button
                type="button"
                className={selectedPrice === 'all' ? 'active' : ''}
                onClick={() => handlePriceFilter('all')}
              >
                전체
              </button>

              <button
                type="button"
                className={selectedPrice === 'under10000' ? 'active' : ''}
                onClick={() => handlePriceFilter('under10000')}
              >
                1만원 이하
              </button>

              <button
                type="button"
                className={selectedPrice === '10000to20000' ? 'active' : ''}
                onClick={() => handlePriceFilter('10000to20000')}
              >
                1만원 ~ 2만원
              </button>

              <button
                type="button"
                className={selectedPrice === 'over20000' ? 'active' : ''}
                onClick={() => handlePriceFilter('over20000')}
              >
                2만원 이상
              </button>
            </div>
          </div>
        )}

        <section className="product-list-grid">
          {currentProducts.map((product) => {
            const isLiked = likedProducts.includes(product.id)

            return (
              <article
  className="product-list-card"
  key={product.id}
  onClick={() => navigate(`/shop/${product.id}`)}
>
                <div className="product-list-image">
                 <img
  src={product.mainImage}
  alt={product.name}
/>
                </div>

                <div className="product-list-info">
                  <div>
                    <p className="product-list-name">
                      {product.name}
                    </p>

                    <strong className="product-list-price">
                      {product.price.toLocaleString()}원
                    </strong>
                  </div>

                  <button
                    type="button"
                    className={`product-list-heart ${
                      isLiked ? 'is-liked' : ''
                    }`}
                    aria-label={`${product.name} 관심상품 등록`}
                    aria-pressed={isLiked}
                    onClick={(e) => {
  e.stopPropagation()
  handleToggleLike(product.id)
}}
                  >
                    {isLiked ? '♥' : '♡'}
                  </button>
                </div>
              </article>
            )
          })}
        </section>

        {totalPages > 1 && (
          <div className="product-list-pagination">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1

              return (
                <button
                  type="button"
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            })}
            <button
  type="button"
  className="product-list-pagination-next"
  onClick={() =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    )
  }
  disabled={currentPage === totalPages}
  aria-label="다음 페이지"
>
  <img
    src="/images/shop/icons/pagination-next.svg"
    alt=""
  />
</button>
          </div>
        )}
      </div>
    </main>
  )
}

export default ProductList