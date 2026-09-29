function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProductCommunity({ images = [] }) {
  if (images.length === 0) return null

  const communityPosts = [
    {
      title: '뭉치 일기장은 표지부터 자꾸 보게 돼요 ☁️',
      description:
        '옆표지 만화가 뭉치 느낌으로 들어가 있어서 그냥 일기장인데도 더 애착 가요.',
      author: '하찮은회사원',
      time: '2시간 전',
      likes: '1.2K',
      comments: '128',
    },
    {
      title: '포포랑 같이 오늘 하루도 기록해요 🍞',
      description:
        '메모나 기록할 때도 캐릭터 감성이 잘 살아서 더 자주 펼쳐보게 돼요.',
      author: '하찮은회사원',
      time: '2시간 전',
      likes: '1.2K',
      comments: '128',
    },
    {
      title: '기운이 일기장은 소소하고 싶은 느낌이에요 📗',
      description:
        '캐릭터마다 옆표지 만화가 다 다른데, 기운이 버전은 또 그 매력이 따로 있어서 고르는 재미가 있어요.',
      author: '하찮은회사원',
      time: '2시간 전',
      likes: '1.2K',
      comments: '128',
    },
  ]

  return (
    <section className="product-community">
      <div className="product-community-header">
        <div className="product-community-heading">
          <h2>다들 어떻게 쓰고 있을까?</h2>
          <p>이 친구가 등장한 커뮤니티 이야기를 구경해보세요.</p>
        </div>

        <button
          type="button"
          className="product-community-more"
        >
          더보기 <span>›</span>
        </button>
      </div>

      <div className="product-community-list">
        {images.map((image, index) => {
          const post = communityPosts[index]

          if (!post) return null

          return (
            <article
              className="product-community-card"
              key={image}
            >
              <div className="product-community-image">
                <img
                  src={image}
                  alt={`하찮이 툰 일기장 사용 후기 ${index + 1}`}
                />

                <span className="product-community-rank">
                  {index + 1}
                </span>
              </div>

              <div className="product-community-card-content">
                <h3>{post.title}</h3>

                <p className="product-community-description">
                  {post.description}
                </p>

                <div className="product-community-author">
                  <span className="product-community-profile" />

                  <span>
                    {post.author} · {post.time}
                  </span>
                </div>

                <div className="product-community-meta">
                  <div className="product-community-stats">
                    <div className="product-community-stat">
                      <HeartIcon />
                      <span>{post.likes}</span>
                    </div>

                    <div className="product-community-stat">
                      <CommentIcon />
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="product-community-bookmark"
                    aria-label="북마크"
                  >
                    <BookmarkIcon />
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ProductCommunity