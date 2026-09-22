
import "./styles/footer.css";

function Footer() {
  return (
    <footer className="site-footer">

      {/* 푸터 상단 */}
      <div className="footer-top">
        <div className="footer-inner footer-top-inner">

          <nav className="footer-links">
            <a href="/brand">브랜드 소개</a>
            <a href="/contact">고객센터</a>
            <a href="/privacy">개인정보처리방침</a>
            <a href="/terms">이용약관</a>
            <a href="/partnership">제휴문의</a>
            <a href="/faq">자주 묻는 질문</a>
          </nav>

          {/* SNS */}
          <div className="footer-social">
            <a href="#" aria-label="인스타그램">◎</a>
            <a href="#" aria-label="유튜브">▶</a>
            <a href="#" aria-label="네이버">N</a>
            <a href="#" aria-label="X">𝕏</a>
          </div>

        </div>
      </div>

      {/* 푸터 본문 */}
      <div className="footer-inner footer-main">

        {/* 브랜드 로고 */}
        <div className="footer-brand">
          <img
            src="/images/home/logo.png"
            alt="HAJJAN"
          />
          <p>작은 것들이 자꾸 눈에 밟혀.</p>
        </div>

        {/* 회사 정보 */}
        <div className="footer-company">
          <p>하찮 / HAJJAN</p>
          <p>대표자 OOO</p>
          <p>사업자등록번호 000-00-00000</p>
        </div>

        {/* 고객센터 */}
        <div className="footer-contact">
          <p>통신 판매업신고번호 2024-서울강남-0000</p>
          <p>고객센터 0000-0000 | hello@hajjan.kr</p>
          <p>서울시 강남구 하찮로 123, 하찮빌딩 5층</p>
        </div>

      </div>

      {/* 저작권 */}
      <div className="footer-copyright">
        © 2026 HAJJAN. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;