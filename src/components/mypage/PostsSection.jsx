import { savedPosts, myPosts } from "../../data/mypage";

function PostList({ title, posts }) {
  return (
    <section className="mypage-post-group">
      <div className="mypage-post-group__header">
        <h2>{title}</h2>

        <button type="button" className="mypage-post-group__more">
          <span>더보기</span>

          <img
            src="/images/mypage/next.svg"
            alt=""
            className="mypage-post-group__more-icon"
          />
        </button>
      </div>

      <div>
        {posts.map((post) => (
          <article key={post.id} className="mypage-post">
            <img src={post.image} alt="" />

            <div className="mypage-post__content">
              <h3>{post.title}</h3>

              {post.date && <time>{post.date}</time>}

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

function PostsSection() {
  return (
    <div className="mypage-posts">
      <PostList title="저장한 게시물" posts={savedPosts} />
      <PostList title="내가 쓴 글" posts={myPosts} />
    </div>
  );
}

export default PostsSection;