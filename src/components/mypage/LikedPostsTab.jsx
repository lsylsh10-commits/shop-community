import { likedPosts } from "../../data/mypage";

function LikedPostsTab() {
  return (
    <section className="mypage-tab-content">
      <h1>좋아요한 게시글</h1>

      <div className="mypage-full-post-list">
        {likedPosts.map((post) => (
          <article key={post.id} className="mypage-post">
            <img src={post.image} alt="" />

            <div className="mypage-post__content">
              <h3>{post.title}</h3>
              <time>{post.date}</time>

              <div className="mypage-post__meta">
                <span>♡ {post.likes}</span>
                <span>○ {post.comments}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LikedPostsTab;