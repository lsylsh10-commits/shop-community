import { friends } from "../../data/mypage";

function FriendsSection() {
  return (
    <section className="mypage-section">
      <div className="mypage-section__header">
        <h2>나의 친구</h2>

        <button type="button" className="mypage-section__more">
          <span>전체보기</span>

          <img
            src="/images/mypage/next.svg"
            alt=""
            className="mypage-section__more-icon"
          />
        </button>
      </div>

      <div className="friends-list">
        {friends.map((friend) => (
          <article key={friend.id} className="friend-item">
            <img src={friend.image} alt={friend.name} />
            <strong>{friend.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FriendsSection;