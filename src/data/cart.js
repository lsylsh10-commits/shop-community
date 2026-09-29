// src/data/cart.js

// --------------------------------------------------
// 장바구니 임시 상품 데이터
// 추후 팀 공통 상품 데이터가 완성되면
// 이 데이터만 제거하고 import 경로를 교체합니다.
// --------------------------------------------------

export const mockCartProducts = [
  {
    id: 1,
    name: "하찮이 든 일기장",
    price: 10000,
    image: "/images/cart/product01.png",
    characters: ["popo"],
    options: ["포포"],
    quantity: 1,
    liked: true,
  },
  {
    id: 2,
    name: "하찮 캐릭터 스티커 세트",
    price: 8000,
    image: "/images/cart/product02.png",
    characters: ["popo", "moongchi", "jjagi", "bbangi", "bandi", "giuni"],
    options: ["6종 세트"],
    quantity: 1,
    liked: true,
  },
];

// --------------------------------------------------
// 추천 상품 임시 데이터
// 상품 상세 페이지 연결을 위해 id를 반드시 유지합니다.
// --------------------------------------------------

export const mockRecommendedProducts = [
  {
    id: 3,
    name: "하찮이들 봉제인형",
    price: 12000,
    image: "/images/cart/recommend01.png",
    characters: ["popo"],
    options: ["포포"],
  },
  {
    id: 4,
    name: "뭉치 먼지클리너",
    price: 12000,
    image: "/images/cart/recommend02.png",
    characters: ["moongchi"],
    options: ["뭉치"],
  },
  {
    id: 5,
    name: "봉제 인형 키링",
    price: 9900,
    image: "/images/cart/recommend03.png",
    characters: ["popo", "moongchi", "jjagi", "bbangi", "bandi", "giuni"],
    options: ["6종"],
  },
  {
    id: 6,
    name: "나이스 데이 썬캐쳐",
    price: 45000,
    image: "/images/cart/recommend04.png",
    characters: ["popo", "moongchi", "jjagi", "bbangi", "bandi", "giuni"],
    options: ["6종"],
  },
];

// --------------------------------------------------
// 장바구니 금액 관련 임시 설정
// --------------------------------------------------

export const cartPriceConfig = {
  discount: 0,
  shippingFee: 3000,
};