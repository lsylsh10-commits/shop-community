import { useEffect, useState } from 'react'
import {
  communityDetailPost,
  detailComments,
  todayPosts,
  similarPosts,
} from '../data/communityDetail'
import { mockProducts } from '../data/mockProducts'
import './community-detail.css'

function CommunityDetail() {
  const [post, setPost] = useState(communityDetailPost)
const linkedProducts = mockProducts.filter((product) =>
  post.productIds?.includes(product.id)
)
const [showPostMenu, setShowPostMenu] = useState(false)
const [isEditing, setIsEditing] = useState(false)

const [editTitle, setEditTitle] = useState(communityDetailPost.title)
const [editContent, setEditContent] = useState(
  communityDetailPost.content.join('\n')
  
)
const [editImages, setEditImages] = useState(
  communityDetailPost.images
)
const [editTags, setEditTags] = useState(
  communityDetailPost.tags.join(', ')
)
  const [selectedImage, setSelectedImage] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const [swipeDirection, setSwipeDirection] = useState('next')
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(detailComments)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [commentSort, setCommentSort] = useState('latest')

  const [likedComments, setLikedComments] = useState([])
  const [replyTargetId, setReplyTargetId] = useState(null)
  const [replyText, setReplyText] = useState('')

  const [commentMenuId, setCommentMenuId] = useState(null)
const [editingCommentId, setEditingCommentId] = useState(null)
const [editingCommentText, setEditingCommentText] = useState('')
useEffect(() => {
  const handleOutsideClick = (e) => {
    const clickedPostMenu = e.target.closest('.detail-more-wrap')
    const clickedCommentMenu = e.target.closest('.detail-comment-more-wrap')

    if (!clickedPostMenu) {
      setShowPostMenu(false)
    }

    if (!clickedCommentMenu) {
      setCommentMenuId(null)
    }
  }

  document.addEventListener('click', handleOutsideClick)

  return () => {
    document.removeEventListener('click', handleOutsideClick)
  }
}, [])

const handleGalleryTouchStart = (e) => {
  setTouchStartX(e.touches[0].clientX)
}

const handleGalleryTouchEnd = (e) => {
  if (touchStartX === null) return

  const touchEndX = e.changedTouches[0].clientX
  const distance = touchStartX - touchEndX

  // 너무 살짝 움직인 건 swipe로 처리하지 않음
  if (Math.abs(distance) < 50) {
    setTouchStartX(null)
    return
  }

  // 왼쪽으로 밀기 → 다음 사진
 if (distance > 0) {
  setSwipeDirection('next')

  setSelectedImage((prev) =>
    prev === post.images.length - 1 ? 0 : prev + 1
  )
}

  // 오른쪽으로 밀기 → 이전 사진
  if (distance < 0) {
  setSwipeDirection('prev')

  setSelectedImage((prev) =>
    prev === 0 ? post.images.length - 1 : prev - 1
  )
}

  setTouchStartX(null)
}

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: Date.now(),
      author: '나',
      date: '방금 전',
      profile: '/images/community/community-profile01.png',
      content: commentText,
      likes: 0,
      comments: 0,
      replies: [],
    }

    setComments((prev) => [newComment, ...prev])
    setCommentText('')
  }

  const handleCommentLike = (commentId) => {
    setLikedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    )
  }
const addReplyToTree = (items, parentId, newReply) => {
  return items.map((item) => {
    if (item.id === parentId) {
      return {
        ...item,
        replies: [...(item.replies || []), newReply],
      }
    }

    if (item.replies?.length) {
      return {
        ...item,
        replies: addReplyToTree(
          item.replies,
          parentId,
          newReply
        ),
      }
    }

    return item
  })
}
const updateCommentContentTree = (
  items,
  targetId,
  newContent
) => {
  return items.map((item) => {
    if (item.id === targetId) {
      return {
        ...item,
        content: newContent,
      }
    }

    if (item.replies?.length) {
      return {
        ...item,
        replies: updateCommentContentTree(
          item.replies,
          targetId,
          newContent
        ),
      }
    }

    return item
  })
}
  
const handleReplySubmit = (parentId) => {
  if (!replyText.trim()) return

  const newReply = {
    id: Date.now(),
    author: '나',
    date: '방금 전',
    profile: '/images/community/community-profile01.png',
    content: replyText,
    likes: 0,
    replies: [],
  }

  setComments((prev) =>
    addReplyToTree(prev, parentId, newReply)
  )

  setReplyText('')
  setReplyTargetId(null)
}

const handleCommentEditStart = (comment) => {
  setEditingCommentId(comment.id)
  setEditingCommentText(comment.content)
  setCommentMenuId(null)
}

const handleCommentEditSave = () => {
  if (!editingCommentText.trim()) return

  setComments((prev) =>
    updateCommentContentTree(
      prev,
      editingCommentId,
      editingCommentText
    )
  )

  setEditingCommentId(null)
  setEditingCommentText('')
}

const handleCommentEditCancel = () => {
  setEditingCommentId(null)
  setEditingCommentText('')
}

const handleShare = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('게시글 주소가 복사됐어요.')
  } catch (error) {
    console.log('주소 복사 실패:', error)
  }
}
const countAllComments = (items) => {
  return items.reduce((total, item) => {
    return total + 1 + countAllComments(item.replies || [])
  }, 0)
}
const sortedComments = [...comments].sort((a, b) => {
  if (commentSort === 'popular') {
    return b.likes - a.likes
  }

  return b.id - a.id
})
const handleEditStart = () => {
  setEditTitle(post.title)
  setEditContent(post.content.join('\n'))
  setEditImages(post.images)
  setEditTags(post.tags.join(', '))
  setIsEditing(true)
  setShowPostMenu(false)
}
const handleImageChange = (index, file) => {
  if (!file) return

  const imageUrl = URL.createObjectURL(file)

  setEditImages((prev) =>
    prev.map((image, i) =>
      i === index ? imageUrl : image
    )
  )
}
const handleEditSave = () => {
  if (!editTitle.trim() || !editContent.trim()) return

  setPost((prev) => ({
    ...prev,
    title: editTitle,
    content: editContent
      .split('\n')
      .filter((text) => text.trim()),
      images: editImages,
      tags: editTags
  .split(',')
  .map((tag) => tag.trim())
  .filter(Boolean),
  }))

  setIsEditing(false)
}

const handleEditCancel = () => {
  setEditTitle(post.title)
  setEditContent(post.content.join('\n'))
  setIsEditing(false)
}
const renderReplies = (replies, depth = 1) => {
  if (!replies?.length) return null

  return (
    <div className="detail-replies-thread">
      {replies.map((reply) => (
        <div
          className={
            reply.replies?.length
              ? 'detail-reply-node has-replies'
              : 'detail-reply-node'
          }
          key={reply.id}
        >
          <div className="detail-comment detail-comment-reply">
            <img
              className="detail-comment-avatar"
              src={reply.profile}
              alt={reply.author}
            />

            <div className="detail-comment-body">
              <div className="detail-comment-meta">
                <strong>{reply.author}</strong>
                <span>· {reply.date}</span>
              </div>

              {editingCommentId === reply.id ? (
  <div className="detail-comment-edit">
    <textarea
      value={editingCommentText}
      onChange={(e) =>
        setEditingCommentText(e.target.value)
      }
    />

    <div className="detail-comment-edit-buttons">
      <button
        type="button"
        onClick={handleCommentEditCancel}
      >
        취소
      </button>

      <button
        type="button"
        onClick={handleCommentEditSave}
      >
        저장
      </button>
    </div>
  </div>
) : (
  <p>{reply.content}</p>
)}

              <div className="detail-comment-actions">
                <button
                  type="button"
                  className={
                    likedComments.includes(reply.id)
                      ? 'comment-like active'
                      : 'comment-like'
                  }
                  onClick={() => handleCommentLike(reply.id)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                      fill={
                        likedComments.includes(reply.id)
                          ? 'currentColor'
                          : 'none'
                      }
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>

                  <span>
                    {reply.likes +
                      (likedComments.includes(reply.id) ? 1 : 0)}
                  </span>
                </button>

                <button
                  type="button"
                  className="comment-reply-button"
                  onClick={() =>
                    setReplyTargetId(
                      replyTargetId === reply.id
                        ? null
                        : reply.id
                    )
                  }
                  aria-label="답글"
                >
                  <svg
                    className="comment-reply-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>

                  <span>{reply.replies?.length || 0}</span>
                </button>
              </div>

              {replyTargetId === reply.id && (
                <div className="detail-reply-write">
                  <input
                    type="text"
                    value={replyText}
                    placeholder="답글을 남겨보세요."
                    onChange={(e) =>
                      setReplyText(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleReplySubmit(reply.id)
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleReplySubmit(reply.id)
                    }
                  >
                    등록
                  </button>
                </div>
              )}
            </div>

            <div className="detail-comment-more-wrap">
  <button
    type="button"
    className="detail-comment-more"
    onClick={() =>
      setCommentMenuId(
        commentMenuId === reply.id ? null : reply.id
      )
    }
  >
    ···
  </button>

  {commentMenuId === reply.id && (
    <div className="detail-comment-more-menu">
      <button
        type="button"
        onClick={() => handleCommentEditStart(reply)}
      >
        수정하기
      </button>
    </div>
  )}
</div>
          </div>

          {renderReplies(reply.replies, depth + 1)}
        </div>
      ))}
    </div>
  )
}
  return (
<main className="community-detail">
  <div className="community-detail-wrap">

    <div className="community-detail-breadcrumb">
      HOME
      <span>›</span>
      COMMUNITY
      <span>›</span>
      DETAIL
    </div>

    <div className="community-detail-inner">
      
        <article className="community-detail-post">

        <div className="detail-post-header">
  <div className="detail-author">
    <img
      src={post.author.profile}
      alt={post.author.name}
    />

    <div>
      <strong>{post.author.name}</strong>
      <span> · {post.date}</span>
    </div>
  </div>
<div className="detail-more-wrap">
  <button
    type="button"
    className="detail-more"
    aria-label="게시글 더보기"
    onClick={() => setShowPostMenu((prev) => !prev)}
  >
    ···
  </button>

  {showPostMenu && (
    <div className="detail-more-menu">
      <button
        type="button"
        onClick={handleEditStart}
      >
        수정하기
      </button>
    </div>
  )}
</div>
</div>
{isEditing ? (
  <div className="detail-edit-field">
    <label className="detail-edit-label">제목</label>

    <input
      className="detail-edit-title"
      type="text"
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)}
    />
  </div>
) : (
  <h1 className="detail-title">
    {post.title}
  </h1>
)}

{isEditing ? (
  <div className="detail-edit-content">
    <label className="detail-edit-label">내용</label>

    <textarea
      value={editContent}
      onChange={(e) => setEditContent(e.target.value)}
    />
  </div>
) : (
  <div className="detail-content">
    {post.content.map((text, index) => (
      <p key={index}>{text}</p>
    ))}
  </div>
)}

{isEditing ? (
  <div className="detail-edit-tags">
    <label className="detail-edit-label">태그</label>

    <input
      type="text"
      value={editTags}
      onChange={(e) => setEditTags(e.target.value)}
      placeholder="태그를 쉼표로 구분해서 입력하세요."
    />

    <span>예: 포포, 짝이, 산책, 하찮은일상</span>
  </div>
) : (
  
  <div className="detail-tags">
    {post.tags.map((tag) => (
      <span key={tag}>#{tag}</span>
    ))}
  </div>
)}
          <div className="detail-gallery">
<div
  className="detail-main-image"
  onTouchStart={handleGalleryTouchStart}
  onTouchEnd={handleGalleryTouchEnd}
  onTouchCancel={() => setTouchStartX(null)}
>
<img
  key={selectedImage}
  className={
    swipeDirection === 'next'
      ? 'gallery-image slide-next'
      : 'gallery-image slide-prev'
  }
  src={
    isEditing
      ? editImages[selectedImage]
      : post.images[selectedImage]
  }
  alt={post.title}
/>

  <button
    type="button"
    className="detail-gallery-prev"
    onClick={() =>
      setSelectedImage((prev) =>
        prev === 0 ? post.images.length - 1 : prev - 1
      )
    }
  >
    ‹
  </button>

  <button
    type="button"
    className="detail-gallery-next"
    onClick={() =>
      setSelectedImage((prev) =>
        prev === post.images.length - 1 ? 0 : prev + 1
      )
    }
  >
    ›
  </button>

  <span className="detail-gallery-count">
    {selectedImage + 1} / {post.images.length}
  </span>
</div>

 <div className="detail-thumbnail-area">
  {isEditing && (
    <div className="detail-thumbnail-edit-title">
      <strong>사진 변경</strong>
      <span>바꿀 사진을 클릭하세요.</span>
    </div>
  )}

  <div className="detail-thumbnail-list">
    {(isEditing ? editImages : post.images).map((image, index) =>
      isEditing ? (
        <label
          className={
            selectedImage === index
              ? 'detail-edit-thumbnail active'
              : 'detail-edit-thumbnail'
          }
          key={`${image}-${index}`}
          onClick={() => setSelectedImage(index)}
        >
          <img
            src={image}
            alt={`${index + 1}번째 사진`}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageChange(index, e.target.files?.[0])
            }
          />
        </label>
      ) : (
        <button
          type="button"
          className={
            selectedImage === index
              ? 'detail-view-thumbnail active'
              : 'detail-view-thumbnail'
          }
          key={`${image}-${index}`}
          onClick={() => setSelectedImage(index)}
        >
          <img
            src={image}
            alt={`${index + 1}번째 사진`}
          />
        </button>
      )
    )}
  </div>
</div>

          </div>
          {isEditing && (
  <div className="detail-edit-buttons">
    <button
      type="button"
      onClick={handleEditCancel}
    >
      취소
    </button>

    <button
      type="button"
      onClick={handleEditSave}
    >
      저장
    </button>
  </div>
)}
  <div className="detail-actions">

  <button
    type="button"
    className={liked ? 'active' : ''}
    onClick={() => setLiked((prev) => !prev)}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>

    <span>{post.likes + (liked ? 1 : 0)}</span>
  </button>

  <button type="button">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>

    <span>{post.comments}</span>
  </button>

  <button
    type="button"
    className={saved ? 'active' : ''}
    onClick={() => setSaved((prev) => !prev)}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 3h12v18l-6-4-6 4V3Z"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>

    <span>{saved ? '저장됨' : '저장'}</span>
  </button>

  <button
    type="button"
    onClick={handleShare}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 16V3M7 8l5-5 5 5M5 13v7h14v-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span>공유</span>
  </button>

</div>
<section className="detail-products">
  <h2>이 게시글에 나온 친구</h2>

  <div className="detail-product-list">
    {linkedProducts.map((product) => (
      <article
        className="detail-product-card"
        key={product.id}
      >
        <img
          src={product.image}
          alt={product.name}
        />

        <div className="detail-product-info">
          <strong>{product.name}</strong>
          <span>{product.price.toLocaleString()}원</span>
        </div>

        <button type="button" aria-label="상품 상세보기">
          ›
        </button>
      </article>
    ))}
  </div>
</section>
<section className="detail-comments">
  <div className="detail-comments-head">
<h2>댓글 {countAllComments(comments)}</h2>

<select
  value={commentSort}
  onChange={(e) => setCommentSort(e.target.value)}
>
  <option value="latest">최신순</option>
  <option value="popular">인기순</option>
</select>
  </div>

  <div className="detail-comment-write">
<img
  className="detail-comment-profile"
  src="/images/community/community-profile01.png"
  alt="내 프로필"
/>

<input
  type="text"
  placeholder="댓글을 남겨보세요."
  value={commentText}
  onChange={(e) => setCommentText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleCommentSubmit()
    }
  }}
/>

<button
  type="button"
  onClick={handleCommentSubmit}
>
  등록
</button>
  </div>

  <div className="detail-comment-list">

<div className="detail-comment-list">
{sortedComments.map((item) => (
  <div
    className={
      item.replies?.length
        ? 'detail-comment-group has-replies'
        : 'detail-comment-group'
    }
    key={item.id}
  >
      <div className="detail-comment">
        <img
  className="detail-comment-avatar"
  src={item.profile}
  alt={item.author}
/>

        <div className="detail-comment-body">
          <div className="detail-comment-meta">
            <strong>{item.author}</strong>
            <span>· {item.date}</span>
          </div>

{editingCommentId === item.id ? (
  <div className="detail-comment-edit">
    <textarea
      value={editingCommentText}
      onChange={(e) =>
        setEditingCommentText(e.target.value)
      }
    />

    <div className="detail-comment-edit-buttons">
      <button
        type="button"
        onClick={handleCommentEditCancel}
      >
        취소
      </button>

      <button
        type="button"
        onClick={handleCommentEditSave}
      >
        저장
      </button>
    </div>
  </div>
) : (
  <p>{item.content}</p>
)}

<div className="detail-comment-actions">

<button
  type="button"
  className={
    likedComments.includes(item.id)
      ? 'comment-like active'
      : 'comment-like'
  }
  onClick={() => handleCommentLike(item.id)}
>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
      fill={
        likedComments.includes(item.id)
          ? 'currentColor'
          : 'none'
      }
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>

    <span>
      {item.likes + (likedComments.includes(item.id) ? 1 : 0)}
    </span>
  </button>

 <button
  type="button"
  className="comment-reply-button"
  onClick={() =>
    setReplyTargetId(
      replyTargetId === item.id ? null : item.id
    )
  }
  aria-label="답글"
>
  <svg
    className="comment-reply-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
  

  <span>{item.replies?.length || 0}</span>
</button>

</div>
{replyTargetId === item.id && (
  <div className="detail-reply-write">

    <input
      type="text"
      value={replyText}
      placeholder="답글을 남겨보세요."
      onChange={(e) => setReplyText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleReplySubmit(item.id)
        }
      }}
    />

    <button
      type="button"
      onClick={() => handleReplySubmit(item.id)}
    >
      등록
    </button>

  </div>
)}
        </div>

       <div className="detail-comment-more-wrap">
  <button
    type="button"
    className="detail-comment-more"
    onClick={() =>
      setCommentMenuId(
        commentMenuId === item.id ? null : item.id
      )
    }
  >
    ···
  </button>

  {commentMenuId === item.id && (
    <div className="detail-comment-more-menu">
      <button
        type="button"
        onClick={() => handleCommentEditStart(item)}
      >
        수정하기
      </button>
    </div>
  )}
</div>
      </div>

{renderReplies(item.replies)}
    </div>
  ))}
</div>

  </div>

</section>

        </article>
      <aside className="community-detail-sidebar">

  <section className="detail-sidebar-section">
    <div className="detail-sidebar-head">
      <h2>오늘의 하찮은 친구들</h2>
      <button type="button">더보기 ›</button>
    </div>

    <div className="detail-sidebar-list">
      {todayPosts.map((item) => (
        <article
          className="detail-sidebar-card"
          key={item.id}
        >
          <img
            src={item.image}
            alt={item.title}
          />

          <div>
            <h3>{item.title}</h3>

<div className="detail-sidebar-stats">

  <span className="detail-sidebar-stat">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>

    {item.likes}
  </span>

  <span className="detail-sidebar-stat">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>

    {item.comments}
  </span>

</div>
          </div>
        </article>
      ))}
    </div>
  </section>

  <section className="detail-sidebar-section">
    <div className="detail-sidebar-head">
      <h2>비슷한 이야기</h2>
      <button type="button">더보기 ›</button>
    </div>

    <div className="detail-sidebar-list">
      {similarPosts.map((item) => (
        <article
          className="detail-sidebar-card"
          key={item.id}
        >
          <img
            src={item.image}
            alt={item.title}
          />

          <div>
            <h3>{item.title}</h3>

<div className="detail-sidebar-stats">

  <span className="detail-sidebar-stat">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>

    {item.likes}
  </span>

  <span className="detail-sidebar-stat">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>

    {item.comments}
  </span>

</div>
          </div>
        </article>
      ))}
    </div>
  </section>

</aside>
      </div>
      </div>
    </main>
  )
}

export default CommunityDetail