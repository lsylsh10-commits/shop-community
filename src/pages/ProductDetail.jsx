import { useParams } from 'react-router-dom'
import { products } from '../data/ShopData'

import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductCommunity from '../components/product/ProductCommunity'
import ProductTabs from '../components/product/ProductTabs'

import '../styles/productDetail.css'

function ProductDetail() {
  const { id } = useParams()

  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <main className="product-detail-page">
        <div className="product-detail-inner">
          <p>상품을 찾을 수 없습니다.</p>
        </div>
      </main>
    )
  }

const mainImage =
  product.id === 1
    ? '/images/hachan-diary/main/main.png'
    : product.image

const thumbnails =
  product.id === 1
    ? [
        '/images/hachan-diary/main/thumb01.png',
        '/images/hachan-diary/main/thumb02.png',
        '/images/hachan-diary/main/thumb03.png',
        '/images/hachan-diary/main/thumb04.png',
      ]
    : []

  const communityImages =
    product.id === 1
      ? [
          '/images/hachan-diary/use/use01.png',
          '/images/hachan-diary/use/use02.png',
          '/images/hachan-diary/use/use03.png',
        ]
      : []

  const detailImage =
    product.id === 1
      ? '/images/hachan-diary/detail/detail.png'
      : null

  return (
    <main className="product-detail-page">
      <div className="product-detail-inner">
        <section className="product-summary">
          <ProductGallery
  mainImage={mainImage}
  thumbnails={thumbnails}
/>
          <ProductInfo product={product} />
        </section>

        <ProductCommunity images={communityImages} />

        <ProductTabs detailImage={detailImage} />
      </div>
    </main>
  )
}

export default ProductDetail