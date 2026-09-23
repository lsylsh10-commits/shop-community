
import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

import "./styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchInputRef = useRef(null);

  // 검색창이 열리면 입력창에 커서 이동
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  // 검색창 열기 / 닫기
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  // 검색 실행
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    console.log("검색어:", searchText);

    // 실제 검색 페이지 연결은 추후 구현
  };

  // 메뉴 클릭 시 모바일 메뉴 닫기
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* 로고 */}
        <Link
          to="/"
          className="header-logo"
          onClick={closeMenu}
        >
          <img
            src="/images/home/logo.png"
            alt="HAJJAN"
          />
        </Link>

        {/* PC / 모바일 메뉴 */}
        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={closeMenu}
          >
            HOME
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={closeMenu}
          >
            MARKET
          </NavLink>

          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={closeMenu}
          >
            COMMUNITY
          </NavLink>

          <NavLink
            to="/mypage"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={closeMenu}
          >
            MY
          </NavLink>

        </nav>

        {/* 오른쪽 아이콘 */}
        <div className="header-actions">

          {/* 좋아요 */}
          <Link to="/mypage" aria-label="관심상품">
            <svg viewBox="0 0 24 24">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </Link>

          {/* 장바구니 */}
          <Link to="/cart" aria-label="장바구니">
            <svg viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
          </Link>

          {/* 검색 영역 */}
          <div
            className={`header-search ${
              searchOpen ? "open" : ""
            }`}
          >
            <form onSubmit={handleSearch}>
              <input
                ref={searchInputRef}
                type="search"
                placeholder="검색어를 입력하세요"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="상품 검색"
                tabIndex={searchOpen ? 0 : -1}
              />
            </form>

            {/* 검색 아이콘 */}
            <button
              type="button"
              className="header-search-button"
              onClick={toggleSearch}
              aria-label={
                searchOpen ? "검색창 닫기" : "검색창 열기"
              }
              aria-expanded={searchOpen}
            >
              {searchOpen ? (
                <svg viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              )}
            </button>
          </div>

          {/* 로그인 */}
          <Link to="/login" aria-label="로그인">
            <svg viewBox="0 0 24 24">
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
            </svg>
          </Link>

          {/* 모바일 메뉴 버튼 */}
          <button
            type="button"
            className="header-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
          >
            <svg viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;