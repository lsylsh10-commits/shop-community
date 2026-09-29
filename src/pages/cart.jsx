import { useState } from "react";

import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import RecommendedProducts from "../components/cart/RecommendedProducts";

import {
  mockCartProducts,
  mockRecommendedProducts,
  cartPriceConfig,
} from "../data/cart";

import "../styles/cart.css";

function Cart() {
  // 장바구니 상품
  const [cartProducts, setCartProducts] = useState(mockCartProducts);

  // 처음에는 모든 상품 선택
  const [selectedIds, setSelectedIds] = useState(
    mockCartProducts.map((product) => product.id)
  );

  // --------------------------------------------------
  // 개별 상품 선택
  // --------------------------------------------------

  const handleSelect = (productId) => {
    setSelectedIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }

      return [...prev, productId];
    });
  };

  // --------------------------------------------------
  // 전체 선택
  // --------------------------------------------------

  const handleSelectAll = () => {
    const isAllSelected =
      cartProducts.length > 0 &&
      selectedIds.length === cartProducts.length;

    if (isAllSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(cartProducts.map((product) => product.id));
  };

  // --------------------------------------------------
  // 수량 증가
  // --------------------------------------------------

  const handleIncrease = (productId) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product
      )
    );
  };

  // --------------------------------------------------
  // 수량 감소
  // 최소 수량은 1
  // --------------------------------------------------

  const handleDecrease = (productId) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: Math.max(1, product.quantity - 1),
            }
          : product
      )
    );
  };

  // --------------------------------------------------
  // 개별 상품 삭제
  // --------------------------------------------------

  const handleDelete = (productId) => {
    setCartProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );

    setSelectedIds((prev) =>
      prev.filter((id) => id !== productId)
    );
  };

  // --------------------------------------------------
  // 선택 상품 삭제
  // --------------------------------------------------

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }

    setCartProducts((prev) =>
      prev.filter(
        (product) => !selectedIds.includes(product.id)
      )
    );

    setSelectedIds([]);
  };

  // --------------------------------------------------
  // 찜 상태 변경
  // --------------------------------------------------

  const handleToggleLike = (productId) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              liked: !product.liked,
            }
          : product
      )
    );
  };

  // --------------------------------------------------
  // 선택된 상품
  // --------------------------------------------------

  const selectedProducts = cartProducts.filter((product) =>
    selectedIds.includes(product.id)
  );

  // --------------------------------------------------
  // 상품 금액 계산
  // price × quantity
  // --------------------------------------------------

  const productTotal = selectedProducts.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  // --------------------------------------------------
  // 할인 금액
  // --------------------------------------------------

  const discount =
    selectedProducts.length > 0
      ? cartPriceConfig.discount
      : 0;

  // --------------------------------------------------
  // 배송비
  // 상품을 선택하지 않았으면 0원
  // --------------------------------------------------

  const shippingFee =
    selectedProducts.length > 0
      ? cartPriceConfig.shippingFee
      : 0;

  // --------------------------------------------------
  // 최종 결제 예상 금액
  // --------------------------------------------------

  const totalPrice =
    productTotal - discount + shippingFee;

  return (
    <main className="cart-page">
      <div className="cart-page__inner">
        {/* 페이지 제목 */}

        <header className="cart-page__header">
          <h1>장바구니</h1>

          <p>
            데려갈 친구들을 한 번 더 확인해보세요.
          </p>
        </header>

        {/* 장바구니 메인 */}

        <div className="cart-page__main">
          <CartList
            products={cartProducts}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onDelete={handleDelete}
            onDeleteSelected={handleDeleteSelected}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onToggleLike={handleToggleLike}
          />

          <CartSummary
            productTotal={productTotal}
            discount={discount}
            shippingFee={shippingFee}
            totalPrice={totalPrice}
            selectedCount={selectedProducts.length}
          />
        </div>

        {/* 추천 상품 */}

        <RecommendedProducts
          products={mockRecommendedProducts}
        />
      </div>
    </main>
  );
}

export default Cart;