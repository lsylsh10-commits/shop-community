const baseProducts = [
  {
    id: 1,
    name: '하찮이 톤 일기장',
    price: 10000,
    image: '/images/shop/new0.png',
    characters: ['popo'],
    options: ['포포'],
    category: 'commute',
  },
  {
    id: 2,
    name: '뭉치 쿠션',
    price: 24000,
    image: '/images/shop/recommend01.png',
    characters: ['mungchi'],
    options: ['뭉치'],
    category: 'life',
  },
  {
    id: 3,
    name: '반디 구급키트',
    price: 18000,
    image: '/images/shop/new03.png',
    characters: ['bandi'],
    options: ['반디'],
    category: 'life',
  },
  {
    id: 4,
    name: '클리어 키캡',
    price: 8000,
    image: '/images/shop/new04.png',
    characters: [],
    options: [],
    category: 'desk',
  },
  {
    id: 5,
    name: '나이스데이 썬캐처',
    price: 45000,
    image: '/images/shop/best01.png',
    characters: [],
    options: [],
    category: 'goods',
  },
  {
    id: 6,
    name: '하찮이들 봉제인형',
    price: 12000,
    image: '/images/shop/best02.png',
    characters: [],
    options: [],
    category: 'goods',
  },
  {
    id: 7,
    name: '모니터 미니 피규어',
    price: 9000,
    image: '/images/shop/best03.png',
    characters: [],
    options: [],
    category: 'desk',
  },
  {
    id: 8,
    name: '짝이 랜덤 피규어',
    price: 9500,
    image: '/images/shop/best04.png',
    characters: ['jjagi'],
    options: ['짝이'],
    category: 'goods',
  },
  {
    id: 9,
    name: '봉제인형 키링',
    price: 9900,
    image: '/images/shop/recommend02.png',
    characters: [],
    options: [],
    category: 'goods',
  },
]

export const mockProducts = Array.from({ length: 25 }, (_, index) => {
  const base = baseProducts[index % baseProducts.length]

  return {
    ...base,
    id: index + 1,
    name:
      index < baseProducts.length
        ? base.name
        : `임시 상품 ${index + 1}`,
         popularity: 25 - index,
  }
})